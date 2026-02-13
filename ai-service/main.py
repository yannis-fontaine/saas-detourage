from fastapi import FastAPI, UploadFile, File, HTTPException
from rembg import remove
from PIL import Image
import io
from fastapi.middleware.cors import CORSMiddleware # Import de sécurité

app = FastAPI(title="Background Remover API")

# --- LE BLOC QUI AUTORISE REACT ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # "*" veut dire "J'accepte tout le monde". En prod, on mettra l'adresse du site.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ----------------------------------------

@app.get("/")
def home():
    return {"message": "L'API de détourage est en ligne !"}

@app.post("/remove-bg")
async def remove_background(file: UploadFile = File(...)):
    """
    Prend une image en entrée, retire le fond, et renvoie l'image PNG (binaire).
    """
    # 1. Validation basique du type de fichier
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Le fichier doit être une image.")

    try:
        # 2. Lire le fichier uploadé (c'est des bytes)
        image_data = await file.read()
        input_image = Image.open(io.BytesIO(image_data))

        # 3. Traitement avec RemBG
        output_image = remove(input_image)

        # 4. Préparer l'image pour le renvoi (en mémoire, pas sur le disque)
        img_byte_arr = io.BytesIO()
        output_image.save(img_byte_arr, format='PNG')
        img_byte_arr.seek(0) # Remettre le curseur au début du fichier

        # 5. Renvoyer l'image directement (Streaming)
        from fastapi.responses import Response
        return Response(content=img_byte_arr.getvalue(), media_type="image/png")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors du traitement : {str(e)}")