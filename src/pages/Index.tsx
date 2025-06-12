import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChefHat, Heart, TrendingUp, Clock, Users, Sparkles } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    value: string;
    points: { [key: string]: number };
  }[];
}

interface Profile {
  type: string;
  title: string;
  description: string;
  solution: string;
  cta: string;
  icon: any;
  color: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Qual é o seu nível de experiência na cozinha?",
    options: [
      { text: "Iniciante total - mal sei fazer um ovo", value: "beginner", points: { iniciante: 3, vendedora: 1, perfeccionista: 0 } },
      { text: "Faço o básico em casa", value: "basic", points: { iniciante: 2, vendedora: 2, perfeccionista: 1 } },
      { text: "Tenho experiência e amo cozinhar", value: "experienced", points: { iniciante: 1, vendedora: 2, perfeccionista: 3 } },
      { text: "Sou expert e ensino outros", value: "expert", points: { iniciante: 0, vendedora: 1, perfeccionista: 3 } }
    ]
  },
  {
    id: 2,
    question: "O que mais te motiva com os brigadeiros?",
    options: [
      { text: "Quero impressionar família e amigos", value: "impress", points: { iniciante: 3, vendedora: 1, perfeccionista: 2 } },
      { text: "Busco uma renda extra ou negócio", value: "business", points: { iniciante: 1, vendedora: 3, perfeccionista: 1 } },
      { text: "Quero dominar a técnica perfeita", value: "perfect", points: { iniciante: 1, vendedora: 1, perfeccionista: 3 } },
      { text: "É meu hobby relaxante", value: "hobby", points: { iniciante: 2, vendedora: 0, perfeccionista: 2 } }
    ]
  },
  {
    id: 3,
    question: "Quanto tempo você tem disponível para se dedicar?",
    options: [
      { text: "Poucos minutos nos fins de semana", value: "minimal", points: { iniciante: 3, vendedora: 0, perfeccionista: 1 } },
      { text: "Algumas horas por semana", value: "moderate", points: { iniciante: 2, vendedora: 2, perfeccionista: 2 } },
      { text: "Várias horas, é prioridade pra mim", value: "dedicated", points: { iniciante: 1, vendedora: 3, perfeccionista: 3 } },
      { text: "O tempo que for necessário", value: "unlimited", points: { iniciante: 0, vendedora: 2, perfeccionista: 3 } }
    ]
  },
  {
    id: 4,
    question: "Qual sua maior dificuldade atual?",
    options: [
      { text: "Não sei nem por onde começar", value: "start", points: { iniciante: 3, vendedora: 1, perfeccionista: 0 } },
      { text: "Meus brigadeiros ficam sem graça", value: "boring", points: { iniciante: 2, vendedora: 1, perfeccionista: 2 } },
      { text: "Não sei como vender ou precificar", value: "selling", points: { iniciante: 1, vendedora: 3, perfeccionista: 1 } },
      { text: "Quero receitas mais sofisticadas", value: "advanced", points: { iniciante: 0, vendedora: 2, perfeccionista: 3 } }
    ]
  },
  {
    id: 5,
    question: "Como você se vê daqui a 6 meses?",
    options: [
      { text: "Fazendo brigadeiros deliciosos em casa", value: "home", points: { iniciante: 3, vendedora: 1, perfeccionista: 2 } },
      { text: "Com uma renda mensal consistente", value: "income", points: { iniciante: 1, vendedora: 3, perfeccionista: 1 } },
      { text: "Sendo reconhecida como especialista", value: "expert", points: { iniciante: 0, vendedora: 2, perfeccionista: 3 } },
      { text: "Ensinando outros a fazer", value: "teaching", points: { iniciante: 1, vendedora: 1, perfeccionista: 3 } }
    ]
  },
  {
    id: 6,
    question: "O que mais te emociona na ideia de dominar os brigadeiros?",
    options: [
      { text: "Ver o sorriso das pessoas ao provarem", value: "joy", points: { iniciante: 3, vendedora: 2, perfeccionista: 2 } },
      { text: "A independência financeira", value: "freedom", points: { iniciante: 1, vendedora: 3, perfeccionista: 1 } },
      { text: "Criar obras de arte comestíveis", value: "art", points: { iniciante: 1, vendedora: 1, perfeccionista: 3 } },
      { text: "Ter uma habilidade especial", value: "skill", points: { iniciante: 2, vendedora: 1, perfeccionista: 2 } }
    ]
  }
];

const profiles: Profile[] = [
  {
    type: "iniciante",
    title: "Doce Começar ✨",
    description: "Você tem todo o potencial para se tornar uma mestra dos brigadeiros! Sua energia e vontade de aprender são seus maiores trunfos.",
    solution: "O Super Brigadeiro + 150 Receitas foi criado especialmente para pessoas como você. Com passo a passo detalhado, dicas de ouro e receitas que vão do básico ao avançado, você vai sair do zero e chegar ao nível expert em poucos dias!",
    cta: "Quero Começar Minha Jornada Doce Agora!",
    icon: Heart,
    color: "bg-pink-500"
  },
  {
    type: "vendedora",
    title: "Empreendedora Doce 🚀",
    description: "Você tem visão de negócio e quer transformar sua paixão em renda! Seu foco em resultados é admirável.",
    solution: "O Super Brigadeiro + 150 Receitas é seu passaporte para o sucesso! Além das receitas irresistíveis, você receberá estratégias de precificação, dicas de vendas e segredos para fidelizar clientes. Sua futura clientela já está esperando!",
    cta: "Quero Começar Meu Negócio dos Sonhos!",
    icon: TrendingUp,
    color: "bg-green-500"
  },
  {
    type: "perfeccionista",
    title: "Mestra dos Doces ⭐",
    description: "Você busca a excelência e quer dominar cada técnica! Sua dedicação ao aperfeiçoamento é inspiradora.",
    solution: "O Super Brigadeiro + 150 Receitas vai elevar seu nível para o próximo patamar! Com receitas exclusivas, técnicas avançadas e segredos profissionais, você vai criar brigadeiros dignos de confeitaria gourmet e ser reconhecida como referência!",
    cta: "Quero Me Tornar Uma Verdadeira Mestra!",
    icon: Sparkles,
    color: "bg-purple-500"
  }
];

const motivationalMessages = [
  "Que demais! Você está no caminho certo! 🎉",
  "Estou amando suas respostas! Continue! ✨",
  "Quase lá! Você está se saindo super bem! 🚀",
  "Perfeito! Mais uma perguntinha! 💫",
  "Uau! Suas respostas são incríveis! 🌟",
  "Última pergunta! Você é demais! 🎊"
];

const Index = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showMotivation, setShowMotivation] = useState(false);
  const [scores, setScores] = useState({ iniciante: 0, vendedora: 0, perfeccionista: 0 });

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (selectedOption: any) => {
    const newAnswers = [...answers, selectedOption.value];
    setAnswers(newAnswers);

    // Update scores
    const newScores = { ...scores };
    Object.keys(selectedOption.points).forEach(profile => {
      newScores[profile as keyof typeof scores] += selectedOption.points[profile];
    });
    setScores(newScores);

    // Show motivational message
    setShowMotivation(true);
    
    setTimeout(() => {
      setShowMotivation(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const getResult = (): Profile => {
    const maxScore = Math.max(...Object.values(scores));
    const winnerProfile = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0] || 'iniciante';
    return profiles.find(p => p.type === winnerProfile) || profiles[0];
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setShowMotivation(false);
    setScores({ iniciante: 0, vendedora: 0, perfeccionista: 0 });
  };

  if (showMotivation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-50 to-yellow-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center animate-scale-in">
          <CardContent className="p-8">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {motivationalMessages[currentQuestion]}
            </h2>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-pink-500 to-orange-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResult) {
    const result = getResult();
    const ResultIcon = result.icon;

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-50 to-yellow-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl animate-fade-in">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className={`${result.color} p-6 rounded-full`}>
                <ResultIcon className="w-12 h-12 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
              Seu Perfil: {result.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-gray-700 text-center leading-relaxed">
              {result.description}
            </p>
            <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-6 rounded-xl border-l-4 border-orange-400">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                <ChefHat className="w-5 h-5 mr-2 text-orange-500" />
                Sua Solução Personalizada:
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {result.solution}
              </p>
            </div>
            <div className="text-center space-y-4">
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {result.cta}
              </Button>
              <Button 
                variant="outline" 
                onClick={resetQuiz}
                className="w-full border-gray-300 hover:bg-gray-50"
              >
                Fazer o Quiz Novamente
              </Button>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">
                ✨ Mais de 10.000 pessoas já transformaram suas vidas com nossos brigadeiros!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-50 to-yellow-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl animate-fade-in">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-4 rounded-full">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
          </div>
          {currentQuestion === 0 ? (
            <>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-4">
                Descubra Seu Perfil Doce! 🎯
              </CardTitle>
              <p className="text-gray-600 text-lg mb-6">
                Responda 6 perguntinhas rápidas e descubra qual é o seu caminho ideal para dominar o mundo dos brigadeiros gourmet!
              </p>
            </>
          ) : (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">
                  Pergunta {currentQuestion + 1} de {questions.length}
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round(progress)}% concluído
                </span>
              </div>
              <Progress value={progress} className="h-3 mb-4" />
            </div>
          )}
        </CardHeader>
        <CardContent>
          {currentQuestion < questions.length && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
                {questions[currentQuestion].question}
              </h2>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full p-6 text-left justify-start hover:bg-gradient-to-r hover:from-pink-50 hover:to-orange-50 hover:border-pink-300 transition-all duration-300 group"
                    onClick={() => handleAnswer(option)}
                  >
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full border-2 border-pink-300 group-hover:border-pink-500 mr-4 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <span className="text-gray-700 group-hover:text-gray-800">
                        {option.text}
                      </span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
