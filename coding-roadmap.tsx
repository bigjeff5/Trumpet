import React, { useState } from 'react';
import { CheckCircle2, Circle, ChevronDown, ChevronUp, Target, Award } from 'lucide-react';

export default function LearningRoadmap() {
  const [expandedPhases, setExpandedPhases] = useState({});
  const [completedItems, setCompletedItems] = useState({});

  const togglePhase = (phaseId) => {
    setExpandedPhases(prev => ({ ...prev, [phaseId]: !prev[phaseId] }));
  };

  const toggleComplete = (itemId) => {
    setCompletedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const roadmap = [
    {
      id: 'phase1',
      title: 'Foundation: Data-First Thinking',
      duration: '3-4 weeks',
      color: 'bg-blue-500',
      items: [
        {
          id: 'dod-principles',
          title: 'Data-Oriented Design Principles',
          description: 'Understand data layout, cache efficiency, and separation of data from behavior',
          resources: [
            '"Data-Oriented Design" by Richard Fabian (free online)',
            'Mike Acton\'s CppCon talk "Data-Oriented Design and C++"',
            'Think in data transformations: Input → Process → Output',
            'Arrays of structs vs struct of arrays (AoS vs SoA)'
          ],
          miniProject: 'Design note data as flat arrays: pitches[], durations[], start_times[] instead of Note objects'
        },
        {
          id: 'numpy',
          title: 'NumPy for Data Processing',
          description: 'Learn vectorized operations on contiguous memory blocks',
          resources: [
            'NumPy fundamentals and array operations',
            'Broadcasting and vectorization concepts',
            'Memory views and dtypes for custom structures',
            'Why NumPy is fast: contiguous memory, SIMD, cache locality'
          ],
          miniProject: 'Create parallel arrays for 1000 notes, filter and transform them using vectorized operations'
        },
        {
          id: 'transforms',
          title: 'Pure Functions & Data Pipelines',
          description: 'Build systems as chains of data transformations',
          resources: [
            'Functional programming basics in Python',
            'map, filter, reduce patterns',
            'Immutable data structures when appropriate',
            'Generator expressions for memory efficiency'
          ],
          miniProject: 'Build a data pipeline: raw MusicXML → parsed data → filtered notes → screen coordinates'
        }
      ]
    },
    {
      id: 'phase2',
      title: 'Audio & File Processing (DOD Style)',
      duration: '4-5 weeks',
      color: 'bg-purple-500',
      items: [
        {
          id: 'audio-buffers',
          title: 'Audio as Raw Data Buffers',
          description: 'Work with audio as arrays of samples, understand PCM data',
          resources: [
            'numpy.ndarray for audio data',
            'soundfile or wave library for raw audio access',
            'Understanding sample rates, bit depth, channels as data dimensions',
            'Direct buffer manipulation vs abstraction layers'
          ],
          miniProject: 'Load WAV file into NumPy array, process samples directly, save modified audio'
        },
        {
          id: 'music-data',
          title: 'Sheet Music as Structured Data',
          description: 'Parse files into simple data structures, not object graphs',
          resources: [
            'MusicXML/MIDI parsing into flat arrays',
            'Use music21 but extract only raw data, discard objects',
            'Design schema: separate tables for notes, measures, tempo changes',
            'Think database-style: normalized vs denormalized data'
          ],
          miniProject: 'Parser that outputs dictionary of arrays: {"pitches": [...], "times": [...], "measures": [...]}'
        },
        {
          id: 'sync-systems',
          title: 'Time-Based Systems Without State Machines',
          description: 'Calculate everything from elapsed time, avoid storing state',
          resources: [
            'Pure functions: current_time → visible_notes',
            'Binary search for efficient time-based lookups',
            'Avoid "tick" mentality, calculate from absolute time',
            'Frame-rate independence through time deltas'
          ],
          miniProject: 'Function that takes (all_notes_array, current_time) and returns notes to display'
        }
      ]
    },
    {
      id: 'phase3',
      title: 'Rendering & Performance',
      duration: '4-5 weeks',
      color: 'bg-green-500',
      items: [
        {
          id: 'batch-rendering',
          title: 'Batch Rendering & Instancing',
          description: 'Draw many similar items efficiently in one call',
          resources: [
            'pygame sprite groups as batch renderers',
            'Pre-calculate screen positions in bulk using NumPy',
            'OpenGL instancing concepts (even if using pygame)',
            'Minimize state changes and draw calls'
          ],
          miniProject: 'Render 500 falling circles using pre-calculated positions array, compare with individual draws'
        },
        {
          id: 'spatial-partitioning',
          title: 'Spatial Data Structures',
          description: 'Efficiently query "what notes are visible right now?"',
          resources: [
            'Simple spatial hash or grid for 2D space',
            'Time-based partitioning for temporal queries',
            'Avoid checking every note every frame',
            'Trade memory for speed: pre-compute lookup tables'
          ],
          miniProject: 'Build time-indexed lookup: given timestamp, instantly find relevant notes without iteration'
        },
        {
          id: 'memory-layout',
          title: 'Cache-Friendly Data Layout',
          description: 'Organize data for how it will be accessed',
          resources: [
            'Hot/cold data separation',
            'Struct of arrays (SoA) for parallel processing',
            'Pack data for cache lines (even in Python)',
            'Profile with memory_profiler and line_profiler'
          ],
          miniProject: 'Reorganize note data into SoA format, benchmark access patterns against naive approach'
        }
      ]
    },
    {
      id: 'phase4',
      title: 'Building Your Trumpet App',
      duration: '6-8 weeks',
      color: 'bg-orange-500',
      items: [
        {
          id: 'systems-architecture',
          title: 'Systems-Based Architecture',
          description: 'Organize as independent systems operating on shared data',
          resources: [
            'ECS (Entity Component System) concepts',
            'Each system processes its relevant data slice',
            'Systems: AudioSystem, RenderSystem, InputSystem, ScoringSystem',
            'Data flows through systems, minimal shared state'
          ],
          miniProject: 'Sketch architecture: global data structure + independent system functions'
        },
        {
          id: 'mvp-dod',
          title: 'MVP with DOD Principles',
          description: 'Core loop: fetch data slice → process → render',
          resources: [
            'Main loop calculates current_time',
            'Each system is pure function taking (data, time) → updates',
            'Separate rendering data from game data',
            'No scattered state, everything derivable from time + input arrays'
          ],
          miniProject: 'Working demo: load song data, render falling notes based on current time'
        },
        {
          id: 'input-processing',
          title: 'Input as Event Streams',
          description: 'Process input events as data to transform',
          resources: [
            'Capture input events into timestamped array',
            'Match input timestamps against note timestamps',
            'Calculate hit accuracy purely from time differences',
            'Consider ringbuffer for recent inputs'
          ],
          miniProject: 'Input detection that fills an events array, matching against note timings'
        },
        {
          id: 'optimization',
          title: 'Profile-Guided Optimization',
          description: 'Measure, identify bottlenecks, optimize hot paths',
          resources: [
            'cProfile and line_profiler for Python',
            'Optimize inner loops with NumPy vectorization',
            'Consider Numba JIT for critical paths',
            'When to drop to C/Cython for ultimate speed'
          ],
          miniProject: 'Profile your app, identify slowest function, optimize it with vectorization'
        }
      ]
    },
    {
      id: 'phase5',
      title: 'Advanced DOD & Beyond',
      duration: 'Ongoing',
      color: 'bg-pink-500',
      items: [
        {
          id: 'async-processing',
          title: 'Parallel Data Processing',
          description: 'Process independent data chunks in parallel',
          resources: [
            'multiprocessing for CPU-bound tasks',
            'NumPy operations already use BLAS/LAPACK parallelism',
            'Partition data for parallel processing',
            'Shared memory arrays with multiprocessing'
          ],
          miniProject: 'Parse multiple songs in parallel, or process audio analysis across multiple cores'
        },
        {
          id: 'low-level',
          title: 'Deeper: Rust or C for Performance',
          description: 'Explore DOD in systems languages for maximum control',
          resources: [
            'Rust\'s ownership model complements DOD beautifully',
            'C with manual memory management for learning',
            'PyO3 to write Rust extensions for Python',
            'Hot-swapping Python bottlenecks with compiled code'
          ],
          miniProject: 'Rewrite audio processing or note matching logic in Rust, benchmark difference'
        },
        {
          id: 'real-audio',
          title: 'Real-Time Audio Input Processing',
          description: 'Process microphone input with minimal latency',
          resources: [
            'pyaudio or sounddevice for real-time streams',
            'Aubio for pitch detection on audio buffers',
            'Circular buffers for streaming data',
            'Minimize allocations in hot path'
          ],
          miniProject: 'Real-time pitch detector: microphone → FFT → note detection, all with pre-allocated buffers'
        },
        {
          id: 'distribution',
          title: 'Package & Optimize Binary',
          description: 'Create distributable with good startup time',
          resources: [
            'PyInstaller with optimization flags',
            'Pre-compute and serialize data at build time',
            'Bundle processed song data, not raw files',
            'Lazy loading for resources'
          ],
          miniProject: 'Package app with pre-processed song database for instant loading'
        }
      ]
    }
  ];

  const getPhaseProgress = (phase) => {
    const completed = phase.items.filter(item => completedItems[item.id]).length;
    return Math.round((completed / phase.items.length) * 100);
  };

  const totalItems = roadmap.reduce((sum, phase) => sum + phase.items.length, 0);
  const totalCompleted = Object.keys(completedItems).filter(k => completedItems[k]).length;
  const overallProgress = Math.round((totalCompleted / totalItems) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Data-Oriented Programming Journey</h1>
          </div>
          <p className="text-gray-600 mb-4">
            From scripts to high-performance systems thinking - building your trumpet app with DOD principles
          </p>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-blue-900">Overall Progress</span>
              <span className="text-sm font-bold text-blue-600">{overallProgress}%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <p className="text-xs text-blue-700 mt-2">{totalCompleted} of {totalItems} milestones completed</p>
          </div>
        </div>

        {/* Roadmap Phases */}
        <div className="space-y-4">
          {roadmap.map((phase, phaseIndex) => {
            const isExpanded = expandedPhases[phase.id];
            const progress = getPhaseProgress(phase);
            
            return (
              <div key={phase.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Phase Header */}
                <button
                  onClick={() => togglePhase(phase.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-full ${phase.color} flex items-center justify-center text-white font-bold text-lg`}>
                      {phaseIndex + 1}
                    </div>
                    <div className="text-left flex-1">
                      <h2 className="text-xl font-bold text-gray-800">{phase.title}</h2>
                      <p className="text-sm text-gray-500">{phase.duration}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-700">{progress}%</div>
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`${phase.color} h-2 rounded-full transition-all`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </button>

                {/* Phase Content */}
                {isExpanded && (
                  <div className="border-t border-gray-200 p-6 bg-gray-50">
                    <div className="space-y-4">
                      {phase.items.map((item) => {
                        const isComplete = completedItems[item.id];
                        
                        return (
                          <div key={item.id} className="bg-white rounded-lg p-5 shadow-sm">
                            <div className="flex items-start gap-4">
                              <button
                                onClick={() => toggleComplete(item.id)}
                                className="mt-1 flex-shrink-0"
                              >
                                {isComplete ? (
                                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                                ) : (
                                  <Circle className="w-6 h-6 text-gray-300 hover:text-gray-400" />
                                )}
                              </button>
                              <div className="flex-1">
                                <h3 className={`font-semibold text-lg mb-2 ${isComplete ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                                  {item.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                                
                                <div className="bg-blue-50 rounded p-3 mb-3">
                                  <div className="font-semibold text-xs text-blue-900 mb-2">📚 RESOURCES:</div>
                                  <ul className="text-xs text-blue-800 space-y-1">
                                    {item.resources.map((resource, idx) => (
                                      <li key={idx}>• {resource}</li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="bg-green-50 rounded p-3">
                                  <div className="font-semibold text-xs text-green-900 mb-1">🎯 MINI-PROJECT:</div>
                                  <p className="text-xs text-green-800">{item.miniProject}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Tips */}
        <div className="mt-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-start gap-3">
            <Award className="w-6 h-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg mb-2">DOD Philosophy Tips</h3>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Think in transformations:</strong> What data comes in? What goes out? What changes?</li>
                <li>• <strong>Profile first, optimize second:</strong> Measure before assuming what's slow</li>
                <li>• <strong>Separate data from behavior:</strong> Data is just data. Functions transform it.</li>
                <li>• <strong>Cache is king:</strong> Sequential access of contiguous memory is 100x faster than random access</li>
                <li>• <strong>Python can be fast:</strong> NumPy + good design gets you 90% there. Rust/C for the last 10%</li>
                <li>• <strong>Your trumpet app benefits hugely:</strong> Processing hundreds of notes per frame? DOD shines here!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}