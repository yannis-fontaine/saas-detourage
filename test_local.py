from rembg import remove
from PIL import Image

# 1. Charger l'image (mets une image nommée 'input.jpg' dans le dossier)
input_path = 'img.jpg'
output_path = 'output.png' # On force le PNG pour la transparence

print(f"Traitement de {input_path} en cours...")

try:
    input_image = Image.open(input_path)
    
    # 2. La magie opère ici
    output_image = remove(input_image)
    
    # 3. Sauvegarder le résultat
    output_image.save(output_path)
    print(f"Succès ! Image sauvegardée sous {output_path}")
    
except Exception as e:
    print(f"Erreur : {e}")