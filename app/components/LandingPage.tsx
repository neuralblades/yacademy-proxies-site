'use client';

import React from 'react';
import { Shield, Cpu, ArrowRight, BookOpen, Users, Target } from 'lucide-react';

interface LandingPageProps {
  onNavigateToSection: (section: 'proxies' | 'mpc') => void;
}

export default function LandingPage({ onNavigateToSection }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Explore the</span>{' '}
                  <span className="block text-green-600 xl:inline">Deep Research</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Comprehensive security research and analysis for Web3 technologies. 
                  Dive into cutting-edge research on proxy patterns and multi-party computation.
                </p>
                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                  <div className="rounded-md shadow">
                    <button
                      onClick={() => onNavigateToSection('proxies')}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10 transition-colors"
                    >
                      Start Exploring
                      <ArrowRight className="ml-2" size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Research Areas Grid */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Research Areas
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Choose your area of interest to explore in-depth security research and analysis.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Proxies Research Card */}
            <div 
              onClick={() => onNavigateToSection('proxies')}
              className="relative group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative p-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Shield className="h-12 w-12 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                      Proxy Research
                    </h3>
                    <p className="text-green-600 font-medium">Smart Contract Security</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <p className="text-gray-600 text-lg">
                    Comprehensive guide to smart contract proxy patterns, security vulnerabilities, 
                    and best practices for Web3 developers and auditors.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span>8+ Topics</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Target className="h-4 w-4 mr-2" />
                    <span>Security Focus</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Expert Research</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Shield className="h-4 w-4 mr-2" />
                    <span>Vulnerability Analysis</span>
                  </div>
                </div>

                <div className="mt-8 flex items-center text-green-600 font-medium group-hover:text-green-700">
                  <span>Explore Proxy Research</span>
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* MPC Research Card */}
            <div 
              onClick={() => onNavigateToSection('mpc')}
              className="relative group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative p-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Cpu className="h-12 w-12 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                      MPC Research
                    </h3>
                    <p className="text-green-600 font-medium">Multi-Party Computation</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <p className="text-gray-600 text-lg">
                    Advanced research on multi-party computation protocols, privacy-preserving 
                    technologies, and cryptographic security analysis.
                  </p>
                </div>

                <div className="mt-8">
                  <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <Cpu className="h-4 w-4 mr-2" />
                    Coming Soon
                  </div>
                </div>

                <div className="mt-8 flex items-center text-green-600 font-medium group-hover:text-green-700">
                  <span>Preview MPC Research</span>
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Research by yAcademy
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500">
              This research effort compiles security knowledge with the goal of improving 
              the correctness of implementations and providing useful resources for security reviews.
            </p>
            <div className="mt-8">
              <a
                href="https://yacademy.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-green-100 hover:bg-green-200 transition-colors"
              >
                Visit yAcademy
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}