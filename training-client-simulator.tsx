import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MessageCircle, ThumbsUp, ThumbsDown, AlertCircle, RotateCcw, BookOpen, HelpCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const TrainingClientSimulator = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const scenarios = [
    {
      situation: "クライアントから「急いで資料が必要なのですが、今日中に作成できますか？」という依頼が17時に届きました。",
      tip: "クライアントの急な要望に対しては、誠意を持って対応しつつも、実現可能な代替案を提示することが重要です。",
      learningPoints: [
        "期待値のコントロール",
        "具体的な代替案の提示",
        "誠実なコミュニケーション"
      ],
      options: [
        {
          text: "申し訳ございません。本日の業務時間内での対応は難しい状況です。明日の午前中であれば確実にご提出できますが、いかがでしょうか？",
          feedback: "✨ 適切な対応です。期待値のコントロールと代替案の提示ができています。\n\n💡 学習ポイント：\n- 実現可能な期限を提示\n- 代替案の具体的な提案\n- 誠実な謝罪と説明",
          points: 10
        },
        {
          text: "承知いたしました。急ぎで対応させていただきます。",
          feedback: "⚠️ 安易な約束は避けるべきです。\n\n💡 改善ポイント：\n- 実現可能性の確認\n- リスクの説明\n- 具体的な完了時期の提示",
          points: 3
        },
        {
          text: "業務時間外となりますので、対応できかねます。",
          feedback: "❌ 代替案を提示せず、単純な拒否は避けるべきです。\n\n💡 改善ポイント：\n- 代替案の提示\n- 共感的な対応\n- 建設的な提案",
          points: 1
        }
      ]
    },
    {
      situation: "予定していた定例ミーティングの30分前に、クライアントから「別の緊急の用事が入ってしまい、本日のミーティングは出席できません」との連絡が入りました。",
      tip: "突発的なスケジュール変更には、柔軟に対応しつつも、次のアクションを主体的に提案することが大切です。",
      learningPoints: [
        "主体的な提案",
        "複数の選択肢提示",
        "スケジュール調整の効率化"
      ],
      options: [
        {
          text: "承知いたしました。次回の候補日を数日分ご提案させていただきますので、ご都合の良い日時をお選びいただけますでしょうか？",
          feedback: "✨ 素晴らしい対応です。\n\n💡 学習ポイント：\n- 主体的な提案\n- 複数の選択肢提示\n- クライアントの選択権の尊重",
          points: 10
        },
        {
          text: "承知いたしました。次回の日程調整をお願いいたします。",
          feedback: "⚠️ 受動的すぎる対応です。\n\n💡 改善ポイント：\n- より主体的な提案\n- 具体的な候補日の提示\n- プロジェクト進行への配慮",
          points: 5
        },
        {
          text: "直前のキャンセルは困ります。キャンセル料が発生いたしますが、よろしいでしょうか？",
          feedback: "❌ 感情的な対応は避けるべきです。\n\n💡 改善ポイント：\n- 建設的な提案\n- 感情的にならない対応\n- 関係性の維持",
          points: 1
        }
      ]
    },
    {
      situation: "クライアントから依頼された作業の途中で、想定以上に時間がかかることが判明しました。",
      tip: "予定外の遅延が発生した場合、早期の状況共有と具体的な対応策の提案が重要です。",
      learningPoints: [
        "早期の状況共有",
        "具体的な対応策提示",
        "透明性の確保"
      ],
      options: [
        {
          text: "現在の進捗状況と追加で必要な時間について早めにご報告させていただき、今後の進め方についてご相談させていただけますでしょうか？",
          feedback: "✨ 適切な対応です。\n\n💡 学習ポイント：\n- 早期の状況共有\n- 具体的な説明\n- クライアントとの協力関係構築",
          points: 10
        },
        {
          text: "予定通りの完了が難しくなってしまいました。納期を延長していただけないでしょうか？",
          feedback: "⚠️ 一方的な納期延長の要請は避けるべきです。\n\n💡 改善ポイント：\n- 具体的な状況説明\n- 複数の対応案提示\n- 今後の防止策の提案",
          points: 4
        },
        {
          text: "時間がかかっても、なんとか予定通り完了させます。",
          feedback: "❌ 無理な約束は避けるべきです。\n\n💡 改善ポイント：\n- 現実的な提案\n- リスクの説明\n- 品質確保の重要性",
          points: 2
        }
      ]
    }
  ];

  const handleChoice = (option) => {
    if (!isAnswered) {
      setFeedback(option.feedback);
      setScore(score + option.points);
      setIsAnswered(true);
      
      setTimeout(() => {
        if (currentScenario < scenarios.length - 1) {
          setCurrentScenario(currentScenario + 1);
          setFeedback(null);
          setIsAnswered(false);
          setShowTip(false);
        }
      }, 3000);
    }
  };

  const resetSimulation = () => {
    setCurrentScenario(0);
    setFeedback(null);
    setScore(0);
    setIsAnswered(false);
    setShowTip(false);
  };

  const toggleTip = () => {
    setShowTip(!showTip);
  };

  const progress = ((currentScenario + 1) / scenarios.length) * 100;
  const maxScore = scenarios.length * 10;
  const scorePercentage = (score / maxScore) * 100;

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            クライアント対応シミュレーター
          </CardTitle>
          <CardDescription className="text-center">
            実践的なシナリオを通じて、適切なクライアント対応を学びましょう
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="mb-6">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-1 text-sm text-gray-500">
              <span>進捗: {currentScenario + 1} / {scenarios.length}</span>
              <span>スコア: {score} / {currentScenario * 10 + 10}</span>
            </div>
          </div>

          {currentScenario < scenarios.length ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageCircle className="flex-shrink-0" />
                  <h3 className="text-xl font-semibold">シナリオ {currentScenario + 1}</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTip}
                  className="flex items-center gap-2"
                >
                  <HelpCircle className="h-4 w-4" />
                  ヒントを{showTip ? '隠す' : '見る'}
                </Button>
              </div>
              
              <p className="text-gray-700">{scenarios[currentScenario].situation}</p>

              {showTip && (
                <Alert>
                  <BookOpen className="h-4 w-4" />
                  <AlertDescription>
                    <p className="font-medium mb-2">{scenarios[currentScenario].tip}</p>
                    <ul className="list-disc list-inside text-sm">
                      {scenarios[currentScenario].learningPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-3">
                {scenarios[currentScenario].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleChoice(option)}
                    className="w-full justify-start text-left p-4"
                    variant={isAnswered ? "ghost" : "outline"}
                    disabled={isAnswered}
                  >
                    {option.text}
                  </Button>
                ))}
              </div>

              {feedback && (
                <div className="p-4 bg-blue-50 rounded-lg animate-fade-in">
                  <pre className="whitespace-pre-wrap font-sans text-blue-800">{feedback}</pre>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">シミュレーション完了</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-lg mb-2">最終スコア: {score} / {maxScore}</p>
                  <Progress value={scorePercentage} className="h-2" />
                </div>

                <div className="p-4 rounded-lg border">
                  {score >= maxScore * 0.8 && (
                    <div className="flex items-center text-green-600 gap-2">
                      <ThumbsUp />
                      <div>
                        <p className="font-semibold">素晴らしい対応力です！</p>
                        <p className="text-sm mt-1">クライアントとの信頼関係を構築する優れたコミュニケーション能力を持っています。</p>
                      </div>
                    </div>
                  )}
                  {score < maxScore * 0.8 && score >= maxScore * 0.5 && (
                    <div className="flex items-center text-yellow-600 gap-2">
                      <AlertCircle />
                      <div>
                        <p className="font-semibold">基本的な対応はできています</p>
                        <p className="text-sm mt-1">さらなる改善の余地があります。各シナリオの学習ポイントを復習してみましょう。</p>
                      </div>
                    </div>
                  )}
                  {score < maxScore * 0.5 && (
                    <div className="flex items-center text-red-600 gap-2">
                      <ThumbsDown />
                      <div>
                        <p className="font-semibold">基本的なクライアント対応について、さらなる学習が必要です</p>
                        <p className="text-sm mt-1">各シナリオのフィードバックを見直し、適切な対応方法を学びましょう。</p>
                      </div>
                    </div>
                  )}
                </div>

                <Button 
                  onClick={resetSimulation}
                  className="w-full"
                  variant="outline"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  もう一度挑戦する
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingClientSimulator;