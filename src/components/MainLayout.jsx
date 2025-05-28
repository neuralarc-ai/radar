import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProgressSidebar from './ProgressSidebar';
import { MinimalFooter } from './Footer';
import filingBg from '../assests/bg/filling.png';
import radarLogoPng from '../assests/radar_top_logo.png';
import styles from './MainLayout.module.css';
import cn from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabaseClient'; // Import supabase client

const MainLayout = ({ children }) => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null); // State to hold user data

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Fetch user data on component mount and auth state changes
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Initial fetch of user data
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
    });

    // Cleanup the auth listener
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []); // Empty dependency array to run only on mount and unmount

  // Placeholder functions for menu actions
  const handleHistoryClick = () => {
    console.log('History clicked');
    // TODO: Implement navigation to history page
    toggleMenu(); // Close menu after action
  };

  const handleUpgradeClick = () => {
    console.log('Upgrade Plan clicked');
    // TODO: Implement opening subscription modal
    toggleMenu(); // Close menu after action
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    // TODO: Implement logout functionality
    toggleMenu(); // Close menu after action
  };

  // Placeholder component for TokenUsage
  const TokenUsage = () => {
    return (
      <div className={styles.tokenUsage}>
        {/* Token Usage Title */}
        <div className={styles.tokenUsageTitle}>Token Usage</div>
        {/* Progress Bar Placeholder */}
        <div className={styles.progressBarContainer}>
            <div className={styles.progressBar}></div>
        </div>
        {/* Usage Text */}
        <div className={styles.usageText}>
            <span className={styles.used}>0 used</span>
            <span className={styles.total}>50,000 total</span>
        </div>
        <div className={styles.remainingText}>
             <span className={styles.remaining}>50,000 remaining</span>
        </div>
      </div>
    );
  };

  // Placeholder component for SubscriptionModal
  const SubscriptionModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>Choose Your Plan</h2>
          </div>
          <button onClick={onClose} className={styles.closeButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className={styles.subscriptionCards}>
            <div className={styles.subscriptionCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.planName}>Plus</h3>
                <div className={styles.priceContainer}>
                  <span className={styles.price}>$14.99</span>
                  <span className={styles.period}>/one-time</span>
                </div>
              </div>
              <ul className={styles.featuresList}>
                <li className={styles.featureItem}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> AI-Powered Compliance Check</li>
                <li className={styles.featureItem}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> Easy Document Management</li>
                <li className={styles.featureItem}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> Reduce filing errors with AI</li>
                <li className={styles.featureItem}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> Save time with automated analysis</li>
              </ul>
              <button className={styles.subscribeButton}>Purchase Now</button>
            </div>
            <div className={styles.subscriptionCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.planName}>Ultra</h3>
                <div className={styles.priceContainer}>
                  <span className={styles.price}>$24.99</span>
                  <span className={styles.period}>/one-time</span>
                </div>
              </div>
              <ul className={styles.featuresList}>
                <li className={styles.featureItem}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> All Plus features</li>
                <li className={styles.featureItem}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> Smart Class Selection Assistant</li>
                <li className={styles.featureItem}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> AI-Powered Accuracy</li>
                <li className={styles.featureItem}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> Usage History</li>
                <li className={styles.featureItem}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> Priority Support</li>
                <li className={styles.featureItem}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> Track your filings in real-time</li>
              </ul>
              <button className={styles.subscribeButton}>Purchase Now</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

  const openSubscriptionModal = () => {
    setIsSubscriptionModalOpen(true);
  };

  const closeSubscriptionModal = () => {
    setIsSubscriptionModalOpen(false);
  };

  console.log('Progress:', progress);

  const getCurrentProgress = () => {
    console.log('Calculating progress for path:', location.pathname);
    
    // Get the appropriate steps based on the path
    const steps = location.pathname.includes('/patent') ? [
      { path: '/dashboard/patent', title: 'Patent Filing', progress: 20 },
      { path: '/dashboard/patent/generate-documents', title: 'Generate Documents', progress: 40 },
      { path: '/dashboard/patent/documents', title: 'Documents', progress: 60 },
      { path: '/dashboard/patent/compliance', title: 'Compliance Check', progress: 80 },
      { path: '/dashboard/patent/filing', title: 'Filing Preparation', progress: 100 }
    ] : [
      { path: '/dashboard/trademark', title: 'Trademark Filing', progress: 20 },
      { path: '/dashboard/generate-documents', title: 'Generate Documents', progress: 40 },
      { path: '/dashboard/documents', title: 'Documents', progress: 60 },
      { path: '/dashboard/compliance', title: 'Compliance Check', progress: 80 },
      { path: '/dashboard/filing-prep', title: 'Filing Preparation', progress: 100 }
    ];

    // Find the current step by checking for exact match or matching path
    const currentStep = steps.find(step => {
      const isExactMatch = location.pathname === step.path;
      // Check if the step path matches the current path
      const isPathMatch = step.path === location.pathname || 
                         location.pathname.startsWith(step.path + '/');
      console.log(`Checking step ${step.path} against current path ${location.pathname}: exact=${isExactMatch}, match=${isPathMatch}`);
      return isPathMatch;
    });

    // Find the step with the longest matching path
    const matchingSteps = steps.filter(step => 
      location.pathname === step.path || location.pathname.startsWith(step.path + '/')
    );
    const bestMatch = matchingSteps.reduce((best, current) => 
      (best?.path.length > current.path.length) ? best : current, 
      null
    );

    console.log('Best matching step found:', bestMatch);
    
    if (bestMatch) {
      console.log('Setting progress to:', bestMatch.progress);
      return bestMatch.progress;
    }

    // If no step matches, return 0
    console.log('No matching step found, returning 0');
    return 0;
  };

  useEffect(() => {
    const newProgress = getCurrentProgress();
    console.log('Progress updated to:', newProgress);
    setProgress(newProgress);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="flex flex-col items-center p-8 flex-grow w-full">
        {/* Top section for logo and menu button */}
        <div className="flex justify-between items-center w-full max-w-[1440px] mb-8 mt-8 px-8">
          {/* Radar Logo */}
          <div className="">
            <img src={radarLogoPng} alt="Radar Logo" className="h-11 w-auto" />
          </div>

          {/* Top-right menu button and dialog container */}
          <div className="relative">
            <button
                className={styles.menuButton}
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
              <div className={styles.menuSquare}>
                  <div className={styles.menuCircle}>
                      <div className={cn(styles.menuLine, { [styles.open]: isOpen })} />
                      <div className={cn(styles.menuLine, { [styles.open]: isOpen })} />
                  </div>
              </div>
            </button>
          </div>
        </div>

        {/* Main layout container with image background and border effect */}
        <div className="relative w-full p-6 max-w-[1440px] mx-auto rounded-[24px] p-3 mb-12 shadow-xl bg-cover bg-center " style={{ backgroundImage: `url(${filingBg})` }}>
          {/* Inner white content area */}
          <div className="flex rounded-[22px] gap-4 overflow-hidden">
            {/* Left panel (ProgressSidebar) */}
            <div className="w-fit bg-white rounded-[22px] flex-shrink-0">
              <ProgressSidebar progress={progress} />
            </div>
            {/* Right panel (Main Content) */}
            <main className="flex-1 max-h-[calc(100vh-244px)] h-full overflow-y-auto rounded-[22px] ">
              {children}
            </main>
          </div>
        </div>
      </div>
      <MinimalFooter />

      <AnimatePresence>
          {isOpen && (
              <>
                  <motion.div
                      className={styles.overlay}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={toggleMenu}
                  />
                  <motion.div
                      className={`${styles.dialog} grain-texture`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                  >
                      <div className={styles.menuItems}>
                          {/* Profile Section */}
                          <div className={styles.profileSection}>
                              {user?.user_metadata?.avatar_url ? (
                                  <img
                                      src={user.user_metadata.avatar_url}
                                      alt="Profile"
                                      width={40}
                                      height={40}
                                      className={styles.profileImage}
                                  />
                              ) : (
                                  <div className={styles.profilePlaceholder}>
                                      {user?.email?.[0]?.toUpperCase() || 'N/A'}
                                  </div>
                              )}
                              <div className={styles.profileInfo}>
                                  <div className={styles.profileName}>
                                      {user?.user_metadata?.full_name || user?.email || 'Please Sign In'}
                                  </div>
                                  <div className={styles.profileEmail}>
                                      {user?.email}
                                  </div>
                              </div>
                          </div>
                          
                          {/* Token Usage Section */}
                          {user && (
                              <div className={styles.menuSection}>
                                  <TokenUsage className={styles.tokenUsage} />
                              </div>
                          )}
                          
                          {/* Menu Items */}
                          {user ? (
                              <>
                                  <button onClick={openSubscriptionModal} className={styles.menuItem}>
                                      <span>Upgrade Plan</span>
                                      {/* Placeholder for Upgrade Icon */}
                                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.menuIcon}><path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                  </button>
                                  <button onClick={handleLogout} className={styles.menuItem}>
                                      <span>Logout</span>
                                      {/* Placeholder for Logout Icon */}
                                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.menuIcon}><path d="M17 16L21 12L17 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V6C2 5.46957 2.21071 4.96086 2.58579 4.58579C2.96086 4.21071 3.46957 4 4 4H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                  </button>
                              </>
                          ) : (
                              <button onClick={() => console.log('Sign In clicked')} className={styles.menuItem}> {/* Placeholder sign-in handler */}
                                  Sign In
                              </button>
                          )}
                      </div>
                  </motion.div>
              </>
          )}
      </AnimatePresence>

      {/* Subscription Modal */}
      <SubscriptionModal 
          isOpen={isSubscriptionModalOpen} 
          onClose={closeSubscriptionModal} 
      />
    </div>
  );
};

export default MainLayout; 