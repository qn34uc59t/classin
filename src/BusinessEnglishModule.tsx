import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, Award, BookOpen, Headphones, MessageSquare, Brain, Play } from 'lucide-react';

type Slide = 
  | { type: 'welcome'; title: string; subtitle: string; content: string }
  | { type: 'objectives'; title: string; objectives: string[] }
  | { type: 'reading'; title: string; subtitle: string; content: string; courses: string[] }
  | { type: 'matching'; title: string; instructions: string; pairs: { id: number; left: string; right: string }[] }
  | { type: 'fillGaps'; title: string; text: string; options: string[] }
  | { type: 'listening'; title: string; subtitle: string; jobs: { name: string; company: string; role: string }[] }
  | { type: 'grammar'; title: string; rules: { use: string; example: string }[] }
  | { type: 'grammarPractice'; title: string; exercises: { sentence: string; answer: string; hint: string }[] }
  | { type: 'quiz'; title: string; subtitle: string; questions: string[] }
  | { type: 'speaking'; title: string; activities: { role: string; task: string }[]; examples: string[] }
  | { type: 'finalQuiz'; title: string; questions: { question: string; options: string[]; correct: number }[] }
  | { type: 'completion'; title: string; content: string };

const BusinessEnglishModule = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, any>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const [selectedCourses, setSelectedCourses] = useState<Set<string>>(new Set());

  const slides: Slide[] = [
    // Welcome Slide
    {
      type: 'welcome',
      title: 'World of Work',
      subtitle: 'Module 1.1 - Training and Workshops',
      content: 'Welcome to this interactive Business English lesson. You will learn about job roles, workplace communication, and professional development.'
    },
    
    // Learning Objectives
    {
      type: 'objectives',
      title: 'Learning Objectives',
      objectives: [
        'Identify different job roles and their responsibilities',
        'Match training courses to business needs',
        'Use present simple tense for work situations',
        'Discuss work-life balance professionally'
      ]
    },

    // Reading Section - J&C Training
    {
      type: 'reading',
      title: 'Reading: Training and Workshops',
      subtitle: 'J&C Training Company',
      content: 'J&C Training is a company providing training for other businesses. Look at the courses J&C Training offers and tick the ones that you find interesting. Compare with your teacher and explain why the courses interest you.\n\nJ&C is a training consultancy for personal and professional development in the workplace. It is based in Oxford and it is run by Janet Coyte. Janet is an experienced teacher and consultant. She runs courses and workshops for companies and universities. As a trainer she helps business people overcome difficulties. She sometimes gives one-to-one sessions on the phone or via email.\n\nShe is the author of several books, and she writes articles on public speaking and presentation skills. Janet is also an internationally accredited public speaker and she gives motivational talks around the world. Clients of J&C say that their courses are entertaining, professional and very practical.',
      courses: [
        'Selling techniques',
        'Cross-cultural communication',
        'Business English intensive courses',
        'How to set up a business through the Internet',
        'Team building',
        'Health and safety in the workplace',
        'How to give effective presentations',
        'How to deal with difficult customers',
        'Public speaking',
        'Speed reading and memory supertraining'
      ]
    },

    // Interactive Exercise 1
    {
      type: 'matching',
      title: 'Exercise 1: Match Job Titles with Definitions',
      instructions: 'Click on a job title, then click on its matching definition.',
      pairs: [
        { id: 1, left: 'An Author', right: 'Someone who writes books or articles' },
        { id: 2, left: 'A Speaker', right: 'Someone who talks at a public event' },
        { id: 3, left: 'A Trainer', right: 'Someone who helps people to improve at a sport, skill or school subject' },
        { id: 4, left: 'A Consultant', right: 'Someone who advises people on a particular subject' }
      ]
    },

    // Janet's Profile
    {
      type: 'fillGaps',
      title: 'Exercise 2: Complete Janet\'s Profile',
      text: 'Janet is an experienced teacher and (1) _____ who runs courses and workshops for companies and universities. As a (2) _____, she helps business people overcome difficulties. She sometimes gives one-to-one sessions on the phone or via email. She is the (3) _____ of several books, and she writes articles on public speaking and presentation skills. Janet is also an internationally accredited public (4) _____ and she gives motivational talks around the world.',
      options: ['consultant', 'trainer', 'author', 'speaker']
    },

    // Listening Section
    {
      type: 'listening',
      title: 'Listening: Job Responsibilities',
      subtitle: 'Five people attending a public speaking workshop',
      jobs: [
        { name: 'Katherine Alessi', company: 'Martil Solutions', role: 'Management Consultant' },
        { name: 'Mark Jenkins', company: 'Soap Heaven', role: 'Sales Representative' },
        { name: 'Kostas Hadavas', company: 'Athens Daily Menu', role: 'Chief Financial Officer' },
        { name: 'Suzanne Wilkes', company: 'P&B Europe', role: 'Quality Manager' },
        { name: 'Carmen Selles', company: 'CarSpek', role: 'Personal Assistant' }
      ]
    },

    // Grammar: Present Simple
    {
      type: 'grammar',
      title: 'Grammar: The Present Simple',
      rules: [
        {
          use: 'Permanent Situations',
          example: 'I\'m a sales rep. I work for a company that supplies computer software.'
        },
        {
          use: 'Habits and Frequency',
          example: 'Do you often travel abroad? Yes, I go to Italy two or three times a month.'
        },
        {
          use: 'Timetables',
          example: 'When does your train leave? It leaves at 14:45.'
        }
      ]
    },

    // Grammar Practice
    {
      type: 'grammarPractice',
      title: 'Grammar Practice: Present Simple',
      exercises: [
        { sentence: 'What _____ your company _____?', answer: 'does / produce', hint: 'produce' },
        { sentence: 'How many people _____ you _____?', answer: 'do / employ', hint: 'employ' },
        { sentence: '_____ you _____ your goods abroad?', answer: 'Do / export', hint: 'export' },
        { sentence: 'How often _____ you _____ staff meetings?', answer: 'do / have', hint: 'have' }
      ]
    },

    // Work-Life Balance Quiz
    {
      type: 'quiz',
      title: 'Work-Life Balance Assessment',
      subtitle: 'Answer honestly using the scale: 0=never, 5=always',
      questions: [
        'Do you plan your day\'s activities?',
        'Do you sleep eight hours a night?',
        'Do you find time to relax during the day?',
        'Are you on time for appointments?',
        'Do you spend more than an hour on lunch?',
        'Do you see your friends at weekends?',
        'Do you do exercise or sports during the week?',
        'Do you read a magazine in the evening?',
        'Do you wake up full of energy in the morning?',
        'Do you laugh in a normal work day?'
      ]
    },

    // Speaking Activity
    {
      type: 'speaking',
      title: 'Speaking: Work-Life Balance Discussion',
      activities: [
        {
          role: 'Student',
          task: 'Discuss your work-life balance with your teacher using the questionnaire above.'
        },
        {
          role: 'Teacher',
          task: 'Give as much information as you can. Use frequency adverbs: always, usually, often, sometimes, rarely, never.'
        }
      ],
      examples: [
        'Teacher: Do you plan your day\'s activities?',
        'Student: Yes, I usually plan my day\'s activities the night before. I write appointments in my diary.',
        'Teacher: How often do you see your friends?',
        'Student: I see them once a week. We have supper together every Friday night.'
      ]
    },

    // Final Assessment
    {
      type: 'finalQuiz',
      title: 'Module Assessment',
      questions: [
        {
          question: 'Which job role is responsible for testing new products and dealing with customer complaints?',
          options: ['Sales Representative', 'Quality Manager', 'Personal Assistant', 'CFO'],
          correct: 1
        },
        {
          question: 'Which sentence uses the present simple correctly?',
          options: [
            'She is working for IBM since 2020',
            'They are having meetings every Monday',
            'We export our products all over Europe',
            'I am knowing three languages'
          ],
          correct: 2
        },
        {
          question: 'What does a consultant do?',
          options: [
            'Writes books and articles',
            'Advises people on a particular subject',
            'Talks at public events',
            'Helps people improve at sports'
          ],
          correct: 1
        },
        {
          question: 'Which adverb of frequency goes AFTER the verb "be"?',
          options: ['Always', 'Never', 'Usually', 'All of the above'],
          correct: 3
        }
      ]
    },

    // Completion
    {
      type: 'completion',
      title: 'Congratulations!',
      content: 'You have completed Module 1.1: World of Work'
    }
  ];

  // SCORM integration
  useEffect(() => {
    // Initialize SCORM if available
    if (typeof window !== 'undefined' && (window as any).API) {
      try {
        (window as any).API.LMSInitialize("");
        console.log('SCORM initialized');
      } catch (e) {
        console.log('SCORM not available');
      }
    }

    // Cleanup on unmount
    return () => {
      if (typeof window !== 'undefined' && (window as any).API) {
        try {
          (window as any).API.LMSFinish("");
        } catch (e) {
          console.log('SCORM cleanup error');
        }
      }
    };
  }, []);

  // Mark lesson as complete when reaching final slide
  useEffect(() => {
    const slide = slides[currentSlide];
    if (slide && slide.type === 'completion') {
      // Mark as completed in SCORM
      if (typeof window !== 'undefined' && (window as any).API) {
        try {
          (window as any).API.LMSSetValue("cmi.core.lesson_status", "completed");
          (window as any).API.LMSCommit("");
          console.log('Lesson marked as completed');
        } catch (e) {
          console.log('SCORM completion error');
        }
      }
    }
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCompletedSections(prev => new Set([...prev, currentSlide]));
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleAnswer = (slideIndex: number, questionIndex: number, value: any) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [`${slideIndex}-${questionIndex}`]: value
    });
  };

  const calculateQuizScore = () => {
    const slide = slides[currentSlide];
    if (slide.type === 'finalQuiz') {
      let correct = 0;
      slide.questions.forEach((q, idx) => {
        if (selectedAnswers[`${currentSlide}-${idx}`] === q.correct) {
          correct++;
        }
      });
      setQuizScore(correct);
    }
  };

  const renderSlide = () => {
    const slide = slides[currentSlide];

    switch (slide.type) {
      case 'welcome':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-12 bg-gradient-to-br from-emerald-50 to-teal-50">
            <BookOpen className="w-24 h-24 text-emerald-600 mb-8" />
            <h1 className="text-6xl font-bold text-emerald-800 mb-4">{slide.title}</h1>
            <h2 className="text-3xl text-emerald-600 mb-8">{slide.subtitle}</h2>
            <p className="text-xl text-gray-700 max-w-3xl">{slide.content}</p>
          </div>
        );

      case 'objectives':
        return (
          <div className="p-12 bg-gradient-to-br from-blue-50 to-indigo-50 h-full">
            <h2 className="text-4xl font-bold text-indigo-800 mb-8">📚 {slide.title}</h2>
            <div className="grid grid-cols-2 gap-6 mt-12">
              {slide.objectives.map((obj, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-indigo-500 hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                    <p className="text-lg text-gray-800">{obj}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'reading':
        return (
          <div className="p-12 bg-gradient-to-br from-amber-50 to-orange-50 h-full overflow-y-auto">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-8 h-8 text-amber-600" />
              <h2 className="text-4xl font-bold text-amber-800">{slide.title}</h2>
            </div>
            <h3 className="text-2xl text-amber-700 mb-6">{slide.subtitle}</h3>
            <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
              <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-line">{slide.content}</p>
            </div>
            <div className="bg-gradient-to-r from-red-100 to-red-50 p-8 rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold text-red-800 mb-6">Available Training Courses - Tick the ones you find interesting:</h4>
              <div className="grid grid-cols-2 gap-4">
                {slide.courses.map((course, idx) => (
                  <label key={idx} className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-red-400">
                    <input
                      type="checkbox"
                      checked={selectedCourses.has(course)}
                      onChange={(e) => {
                        const newSet = new Set(selectedCourses);
                        if (e.target.checked) {
                          newSet.add(course);
                        } else {
                          newSet.delete(course);
                        }
                        setSelectedCourses(newSet);
                      }}
                      className="w-5 h-5 text-red-600 rounded focus:ring-2 focus:ring-red-500"
                    />
                    <span className="text-lg text-gray-800">{course}</span>
                  </label>
                ))}
              </div>
              {selectedCourses.size > 0 && (
                <div className="mt-6 p-4 bg-white rounded-lg">
                  <p className="text-sm text-gray-600">You have selected {selectedCourses.size} course(s). Explain to your teacher why these courses interest you.</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'matching':
        return (
          <div className="p-12 bg-gradient-to-br from-purple-50 to-pink-50 h-full">
            <h2 className="text-4xl font-bold text-purple-800 mb-4">{slide.title}</h2>
            <p className="text-xl text-purple-600 mb-8">{slide.instructions}</p>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-purple-700 mb-4">Job Titles</h3>
                {slide.pairs.map((pair) => (
                  <div key={pair.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 border-purple-200 hover:border-purple-400">
                    <p className="text-lg font-semibold text-gray-800">{pair.left}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-pink-700 mb-4">Definitions</h3>
                {slide.pairs.map((pair) => (
                  <div key={pair.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 border-pink-200 hover:border-pink-400">
                    <p className="text-lg text-gray-800">{pair.right}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'listening':
        return (
          <div className="p-12 bg-gradient-to-br from-cyan-50 to-blue-50 h-full overflow-y-auto">
            <div className="flex items-center gap-3 mb-6">
              <Headphones className="w-8 h-8 text-cyan-600" />
              <h2 className="text-4xl font-bold text-cyan-800">{slide.title}</h2>
            </div>
            <p className="text-xl text-cyan-600 mb-4">{slide.subtitle}</p>
            <p className="text-lg text-cyan-700 mb-6">Listen to the five workshop participants introducing themselves. Complete the badges with the correct job title for each person.</p>
            
            {/* Audio Player */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
              <div className="flex items-center justify-between mb-4">
                <p className="text-lg font-semibold text-cyan-800">📻 Audio Recording:</p>
                <button className="flex items-center gap-2 bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors">
                  <Play className="w-5 h-5" />
                  <span>Play Audio</span>
                </button>
              </div>
              
              <div className="bg-cyan-100 p-4 rounded-lg mb-4">
                <p className="text-sm text-cyan-800">💡 <strong>Your task:</strong> Listen to the five workshop participants introducing themselves. Match each person's introduction with their job title from Exercise 5.</p>
              </div>
              
              <details className="bg-gray-50 p-4 rounded-lg">
                <summary className="cursor-pointer text-sm font-semibold text-gray-700">📄 Click to view transcript</summary>
                <div className="mt-3 space-y-3 pt-3 border-t border-gray-300">
                  <p className="text-sm text-gray-700"><strong>Katherine:</strong> "Hi, I'm Katherine Alessi from Marfil Solutions. I'm a management consultant."</p>
                  <p className="text-sm text-gray-700"><strong>Mark:</strong> "Hello, I'm Mark Jenkins from Soap Heaven. I'm a sales representative."</p>
                  <p className="text-sm text-gray-700"><strong>Kostas:</strong> "Hi, my name is Kostas Hadavas from Athens Daily Menu. I'm the chief financial officer."</p>
                  <p className="text-sm text-gray-700"><strong>Suzanne:</strong> "Hello, I'm Suzanne Wilkes from P&B Europe. I'm the quality manager."</p>
                  <p className="text-sm text-gray-700"><strong>Carmen:</strong> "Hi, I'm Carmen Selles from CarSpek. I'm a personal assistant."</p>
                </div>
              </details>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {slide.jobs.map((person, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">[Photo: {person.name}]</span>
                  </div>
                  <h3 className="text-xl font-bold text-cyan-800 mb-2">{person.name}</h3>
                  <p className="text-gray-600 mb-1">{person.company}</p>
                  <p className="text-cyan-700 font-semibold">{person.role}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'grammar':
        return (
          <div className="p-12 bg-gradient-to-br from-green-50 to-emerald-50 h-full">
            <div className="flex items-center gap-3 mb-8">
              <Brain className="w-8 h-8 text-green-600" />
              <h2 className="text-4xl font-bold text-green-800">{slide.title}</h2>
            </div>
            <div className="bg-green-100 border-l-4 border-green-600 p-6 rounded-lg mb-8">
              <p className="text-lg text-green-900">The present simple is used to talk about permanent situations, habits and frequency of activities, and timetables.</p>
            </div>
            <div className="space-y-6">
              {slide.rules.map((rule, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold text-green-700 mb-3">• {rule.use}</h3>
                  <div className="bg-gray-50 p-4 rounded border-l-4 border-green-400">
                    <p className="text-lg text-gray-800 italic">{rule.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'grammarPractice':
        return (
          <div className="p-12 bg-gradient-to-br from-yellow-50 to-amber-50 h-full">
            <h2 className="text-4xl font-bold text-yellow-800 mb-8">{slide.title}</h2>
            <div className="space-y-6">
              {slide.exercises.map((exercise, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-lg">
                  <p className="text-xl text-gray-800 mb-4">{exercise.sentence}</p>
                  <input
                    type="text"
                    placeholder={`Hint: ${exercise.hint}`}
                    className="w-full p-3 border-2 border-yellow-300 rounded-lg focus:border-yellow-500 focus:outline-none"
                    value={selectedAnswers[`${currentSlide}-${idx}`] || ''}
                    onChange={(e) => handleAnswer(currentSlide, idx, e.target.value)}
                  />
                  <p className="text-sm text-gray-500 mt-2">Correct answer: {exercise.answer}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'quiz':
        return (
          <div className="p-12 bg-gradient-to-br from-violet-50 to-purple-50 h-full overflow-y-auto">
            <h2 className="text-4xl font-bold text-violet-800 mb-4">{slide.title}</h2>
            <p className="text-xl text-violet-600 mb-8">{slide.subtitle}</p>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              {slide.questions.map((question, idx) => (
                <div key={idx} className="mb-6 pb-6 border-b border-gray-200 last:border-0">
                  <p className="text-lg text-gray-800 mb-3">{idx + 1}. {question}</p>
                  <div className="flex gap-2">
                    {[0, 1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        onClick={() => handleAnswer(currentSlide, idx, value)}
                        className={`w-12 h-12 rounded-lg font-bold transition-all ${
                          selectedAnswers[`${currentSlide}-${idx}`] === value
                            ? 'bg-violet-600 text-white scale-110'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'speaking':
        return (
          <div className="p-12 bg-gradient-to-br from-rose-50 to-pink-50 h-full overflow-y-auto">
            <div className="flex items-center gap-3 mb-8">
              <MessageSquare className="w-8 h-8 text-rose-600" />
              <h2 className="text-4xl font-bold text-rose-800">{slide.title}</h2>
            </div>
            <div className="mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-rose-500">
                <h3 className="text-2xl font-bold text-rose-700 mb-4">{slide.activities[0].role}</h3>
                <p className="text-lg text-gray-800">{slide.activities[0].task}</p>
                <p className="text-lg text-gray-800 mt-4">{slide.activities[1].task}</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-rose-100 to-pink-100 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-rose-800 mb-6">💬 Example Dialogue</h3>
              <div className="space-y-4">
                {slide.examples.map((example, idx) => (
                  <div key={idx} className={`p-4 rounded-lg ${idx % 2 === 0 ? 'bg-white ml-0 mr-12' : 'bg-rose-50 ml-12 mr-0'}`}>
                    <p className="text-lg text-gray-800">{example}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'finalQuiz':
        return (
          <div className="p-12 bg-gradient-to-br from-indigo-50 to-blue-50 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-bold text-indigo-800">{slide.title}</h2>
              {quizScore !== null && (
                <div className="bg-white px-6 py-3 rounded-lg shadow-lg">
                  <p className="text-2xl font-bold text-indigo-800">Score: {quizScore}/{slide.questions.length}</p>
                </div>
              )}
            </div>
            <div className="space-y-6">
              {slide.questions.map((q, qIdx) => (
                <div key={qIdx} className="bg-white p-6 rounded-lg shadow-lg">
                  <p className="text-xl font-semibold text-gray-800 mb-4">{qIdx + 1}. {q.question}</p>
                  <div className="space-y-3">
                    {q.options.map((option, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleAnswer(currentSlide, qIdx, oIdx)}
                        className={`w-full text-left p-4 rounded-lg transition-all ${
                          selectedAnswers[`${currentSlide}-${qIdx}`] === oIdx
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {quizScore === null && (
              <button
                onClick={calculateQuizScore}
                className="mt-8 bg-indigo-600 text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-indigo-700 transition-colors"
              >
                Submit Assessment
              </button>
            )}
          </div>
        );

      case 'completion':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-12 bg-gradient-to-br from-green-50 to-emerald-50">
            <Award className="w-32 h-32 text-green-600 mb-8 animate-bounce" />
            <h1 className="text-6xl font-bold text-green-800 mb-4">{slide.title}</h1>
            <p className="text-2xl text-green-600 mb-8">{slide.content}</p>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-xl text-gray-700 mb-4">You have mastered:</p>
              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Job roles & responsibilities</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Present simple tense</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Business vocabulary</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Work-life balance discussion</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-600 text-white px-8 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Business English E-Learning</h1>
            <p className="text-emerald-100">Module 1.1: World of Work</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 px-4 py-2 rounded-lg">
              <span className="text-sm">Progress: {currentSlide + 1}/{slides.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2">
        <div
          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        {renderSlide()}
      </div>

      {/* Navigation Footer */}
      <div className="bg-white border-t border-gray-200 px-8 py-4 flex items-center justify-between">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
            currentSlide === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-emerald-600 text-white hover:bg-emerald-700'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>

        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentSlide
                  ? 'bg-emerald-600 w-8'
                  : completedSections.has(idx)
                  ? 'bg-emerald-400'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
            currentSlide === slides.length - 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-emerald-600 text-white hover:bg-emerald-700'
          }`}
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default BusinessEnglishModule;

