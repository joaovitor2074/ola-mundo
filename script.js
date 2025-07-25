const canvas = document.getElementById("roleta");
const ctx = canvas.getContext("2d");
const girarBtn = document.getElementById("girar");
const perguntaTexto = document.getElementById("pergunta-texto");
const alternativasDiv = document.getElementById("alternativas");
const feedbackDiv = document.getElementById("feedback");

const secoes = [
  "Pergunta de Lógica",
  "Pergunta de História",
  "Pergunta de Ciências",
  "Pergunta de JS",
  "População de Codó",
  "Rio de Codó",
  "Festa de Codó",
  "Cultura de Codó"
];

const perguntas = [
  {
    pergunta: "Quanto é 2 + 2 * 2?",
    alternativas: ["A) 6", "B) 8", "C) 12"],
    correta: 0
  },
  {
    pergunta: "Em que ano o Brasil foi descoberto?",
    alternativas: ["A) 1500", "B) 1822", "C) 1889"],
    correta: 0
  },
  {
    pergunta: "Qual planeta é o mais próximo do Sol?",
    alternativas: ["A) Terra", "B) Vênus", "C) Mercúrio"],
    correta: 2
  },
  {
    pergunta: "Como declarar variável em JavaScript?",
    alternativas: ["A) const nome = \"João\";", "B) var nome: \"João\";", "C) nome = var \"João\";"],
    correta: 0
  },
  {
    pergunta: "Quantos habitantes Codó tem aprox.?",
    alternativas: ["A) 50 mil", "B) 120 mil", "C) 200 mil"],
    correta: 1
  },
  {
    pergunta: "Qual rio importante passa por Codó?",
    alternativas: ["A) Parnaíba", "B) Itapecuru", "C) Tocantins"],
    correta: 1
  },
  {
    pergunta: "Evento tradicional de Codó?",
    alternativas: ["A) Bumba Meu Boi", "B) Oktoberfest", "C) Carnaval de Olinda"],
    correta: 0
  },
  {
    pergunta: "Codó é conhecida como cidade dos...?",
    alternativas: ["A) Milagres", "B) Espíritos", "C) Pajés e Terreiros de Umbanda"],
    correta: 2
  }
];

const cores = ["#FF6384", "#36A2EB", "#FFCE56", "#8BC34A", "#FF9800", "#9C27B0", "#00BCD4", "#E91E63"];

let anguloAtual = 0;

function desenharSetores() {
  const raio = canvas.width / 2;
  const centro = raio;

  for (let i = 0; i < secoes.length; i++) {
    // Ajusta para começar do topo (90° = PI/2 rad)
    const anguloInicial = (2 * Math.PI * i) / secoes.length - Math.PI / 2;
    const anguloFinal = (2 * Math.PI * (i + 1)) / secoes.length - Math.PI / 2;

    ctx.beginPath();
    ctx.moveTo(centro, centro);
    ctx.arc(centro, centro, raio, anguloInicial, anguloFinal);
    ctx.fillStyle = cores[i];
    ctx.fill();

    ctx.save();
    ctx.translate(centro, centro);
    ctx.rotate(anguloInicial + Math.PI / secoes.length);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "14px Arial";
    ctx.fillText(secoes[i], raio - 10, 0);
    ctx.restore();
  }
}

function desenharSeta() {
  const centro = canvas.width / 2;
  ctx.beginPath();
  ctx.moveTo(centro - 10, 10);
  ctx.lineTo(centro + 10, 10);
  ctx.lineTo(centro, 0);
  ctx.closePath();
  ctx.fillStyle = "#222";
  ctx.fill();
}

function mostrarPergunta(index) {
  const pergunta = perguntas[index];
  perguntaTexto.textContent = pergunta.pergunta;
  alternativasDiv.innerHTML = "";
  feedbackDiv.textContent = "";

  pergunta.alternativas.forEach((texto, i) => {
    const btn = document.createElement("button");
    btn.textContent = texto;
    btn.onclick = () => {
      if (i === pergunta.correta) {
        feedbackDiv.textContent = "✅ Resposta correta!";
        feedbackDiv.style.color = "green";
      } else {
        feedbackDiv.textContent = "❌ Resposta errada!";
        feedbackDiv.style.color = "red";
      }
    };
    alternativasDiv.appendChild(btn);
  });
}

desenharSetores();
desenharSeta();

girarBtn.addEventListener("click", () => {
  const giro = Math.floor(Math.random() * 360) + 1440; // 4 a 5 voltas
  const duracao = 3000;
  const inicio = performance.now();

  function animar(tempoAtual) {
    const tempo = tempoAtual - inicio;
    const progresso = Math.min(tempo / duracao, 1);
    const angulo = anguloAtual + progresso * giro;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((angulo * Math.PI) / 180);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    desenharSetores();
    ctx.restore();

    desenharSeta(); // seta fixa

    if (progresso < 1) {
      requestAnimationFrame(animar);
    } else {
      anguloAtual = angulo % 353.4;
      const setores = secoes.length;
      const anguloPorSetor = 360 / setores;
      const index = Math.floor(((360 - anguloAtual + anguloPorSetor / 2) % 360) / anguloPorSetor);
      mostrarPergunta(index);
    }
  }

  requestAnimationFrame(animar);
});
