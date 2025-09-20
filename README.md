# BarristerBot  

**BarristerBot** is a Generative AI-based legal chatbot designed to provide **personalized legal advice and solutions** according to **Pakistani law**. The system leverages **Retrieval-Augmented Generation (RAG)** and **Large Language Models (LLMs)** to deliver accessible, accurate, and context-aware legal guidance.  

## 📖 Thesis

You can read the full thesis for this project here:  
📄 [BarristerBot Thesis (PDF)](./thesis/BarristerBot_Thesis.pdf)


🔗 **Live Demo:** [barrister-bot.vercel.app](https://barrister-bot.vercel.app/)  
📂 **Dataset:** [Pakistan Law Data (Kaggle)](https://www.kaggle.com/datasets/ayeshajadoon/pakistan-law-data)  
📑 **Source of Laws:** [Ministry of Law and Justice, Pakistan](https://molaw.gov.pk/)  

---

## 🚀 Features  

-🧑‍⚖ Provides **legal advice and answers** based on Pakistani law  
- 📚 Uses **Retrieval-Augmented Generation (RAG)** for reliable information retrieval  
- 🎙️ **Voice-to-text support** for interactive communication  
- 🔒 **PII masking** to protect user privacy  
- 🔑 **Secure authentication** with JWT and Google Social Login  
- 💾 Conversation history management with **Hasura + GraphQL**  
- 🌐 Fully deployed on **Vercel** for seamless accessibility  

---

## 🛠️ Tech Stack  

- **Frontend:** Next.js (TypeScript)  
- **Backend:** Next.js server components  
- **LLM:** Mistral 8x7B  
- **Embeddings & RAG Pipeline:** LlamaIndex + Together.ai embeddings  
- **Vector Database:** Chroma DB  
- **Data Management:** Hasura + GraphQL  
- **PII Masking:** BERT-based model  
- **Voice Integration:** Google Speech-to-Text  
- **Authentication:** JWT-based + Google Social Login  
- **Deployment:** Vercel  

---

## 📂 Dataset  

The dataset powering BarristerBot consists of **Pakistani legal documents** extracted from the official **[Ministry of Law and Justice](https://molaw.gov.pk/)** website.  

- Processed and curated dataset available on Kaggle:  
  👉 [Pakistan Law Data](https://www.kaggle.com/datasets/ayeshajadoon/pakistan-law-data)  

---

## ⚙️ Installation & Setup  

### 1. Clone Repository  
```bash
git clone https://github.com/yourusername/barristerbot.git
cd barristerbot
```


### 2.  Install Dependencies
``` bash
npm install
```

### 3. Setup Environment Variables
Create a ```.env.local``` file in the root directory and add:
```bash
NEXT_PUBLIC_HASURA_GRAPHQL_URL=your_hasura_url
NEXT_PUBLIC_CHROMADB_URL=your_chroma_db_url
NEXT_PUBLIC_TOGETHER_API_KEY=your_together_ai_api_key
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret
```

### 4. Run Development Server
```bash
npm run dev
```
App will be available at: [(http://localhost:3000/)]


## 🧪 Future Improvements

- Expansion of dataset with more legal resources
- Integration with Urdu NLP models for bilingual support
- Improved UI/UX for better accessibility
- Advanced analytics for case tracking and recommendations

## 📜 License

This project is licensed under the MIT License – feel free to use, modify, and distribute.
