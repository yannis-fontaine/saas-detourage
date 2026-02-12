# SaaS de Détourage d'Images (IA) 📸

Application web complète permettant de retirer le fond d'images automatiquement grâce au Deep Learning (Modèle U²-Net).

## 🏗️ Architecture

* **Frontend :** React + Vite + Axios
* **Backend IA :** Python + FastAPI + RemBG (U²-Net)
* **Environnement :** Conda

## 🛠️ Installation et Lancement

### 1. Backend (Service IA)

Pré-requis : Avoir [Miniconda](https://docs.conda.io/en/latest/miniconda.html) installé.

1. Aller dans le dossier du service :
   ```bash
   cd ai-service

2. Créer l'environnement Conda à partir du fichier de configuration :
    ```bash
    conda env create -f environment.yml

3. Activer l'environnement :
    ```bash
    conda activate bgremove

4. Lancer le serveur API :
    ```bash
    uvicorn main:app --reload

L'API sera accessible sur : http://127.0.0.1:8000/docs


### 2. Frontend (Interface React)

Pré-requis : Avoir Node.js installé.

1. Aller dans le dossier frontend :
    ```bash
    cd frontend

2. Installer les dépendances :
    ```bash
    npm install

3. Lancer le serveur de développement :
    ```bash
    npm run dev

L'interface sera accessible sur : http://localhost:5173

Test de synchronisation depuis le nouvel ordinateur : ✅ Succès.

