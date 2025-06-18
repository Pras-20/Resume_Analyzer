from flask import Blueprint, request,jsonify
import fitz 
from sentence_transformers import SentenceTransformer ,util
import re 
import pytesseract
from pdf2image import convert_from_bytes
from PIL import Image
import io
import requests

from auth_utils import token_required
import os 
from dotenv import load_dotenv

load_dotenv()



analyzer_bp=Blueprint('analyzer',__name__)

model=SentenceTransformer('all-MiniLM-L6-V2')
api_key=os.getenv('HF_API_KEY')


def extract_data_from_pdf(file):
    text = ""
    pdf_bytes = file.read()

    try:
        # Try regular text extraction
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        for page in doc:
            text += page.get_text()

        if text.strip():
            return text

        print("No text found with PyMuPDF. Falling back to OCR...")
    except Exception as e:
        print("Error reading PDF with fitz:", e)

    # OCR fallback using pdf2image + pytesseract
    try:
        images = convert_from_bytes(pdf_bytes)
        for img in images:
            text += pytesseract.image_to_string(img)
    except Exception as e:
        print("OCR failed:", e)

    return text



def extract_sentence(text):
    return[s.strip() for s in re.split(r'[.?!\n]',text) if len(s.strip()) > 5]

def generate_improvement_points(jd_text,resume_text):
    jd_sentences=extract_sentence(jd_text)
    resume_sentences=extract_sentence(resume_text)

    jd_embeddings=model.encode(jd_sentences,convert_to_tensor=True)
    resume_embeddings=model.encode(resume_sentences,convert_to_tensor=True)

    improvement_points=[]

    for i,jd_sentence in enumerate(jd_sentences):
        sims=util.cos_sim(jd_embeddings[i],resume_embeddings)
        max_sim=sims.max().item()

        if max_sim < 0.6:
            improvement_points.append(f'Your resume lacks content related to "{jd_sentence}"')

    return improvement_points

def generate_detailed_feedback(jd_text,resume_text):

    prompt=f"""
    You are a helpful assistant that reads a job description and a candidate's resume. 
    Based on the content, provide detailed and constructive feedback on how the candidate can improve their resume to better fit the job description.
    
    Job Description:
    {jd_text}

    Resume:
    {resume_text}

    Feedback:
    """
    
    headers={
        "Authorization" : f"Bearer {api_key}"
    }

    json_data={
        "inputs":prompt,
        "parameters":{
            "max_new_tokens":300
        }
    }

    response=requests.post("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3",
                           headers=headers,
                           json=json_data
            )
    if response.status_code == 200:
        try:
            return response.json()[0]["generated_text"].split("Feedback:")[-1].strip()
        except Exception:
            return "Unexpected response format from Hugging Face."
    else:
        return f"Hugging Face API error: {response.status_code}"
    



@analyzer_bp.route('/analyze',methods=['POST'])
##@token_required

def analyze():

    if 'resume' not in request.files or 'jobdescription' not in request.form:
        return jsonify({"error":"Missing resume or job description"}),400
    

    
    resume_file=request.files['resume']
    job_description=request.form['jobdescription']

    resume_text=extract_data_from_pdf(resume_file)
    print(resume_text)
    if not resume_text.strip():
        return jsonify({"error": "Failed to extract resume text"}), 400

    improvement_points=generate_improvement_points(job_description,resume_text)

    detailed_feedback=generate_detailed_feedback(job_description,resume_text)

    match_score=max(0,100-len(improvement_points)*5)

    return jsonify({
        "match_score":match_score,
        "improvement_points":improvement_points,
        "detailed_feedback": detailed_feedback
    })

