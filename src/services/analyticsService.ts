
export const trackVisitor = (): void => {
  try {
    const sessionVisited = sessionStorage.getItem('gp_session_visited');
    if (!sessionVisited) {
      sessionStorage.setItem('gp_session_visited', 'true');
      const currentCount = parseInt(localStorage.getItem('gp_visitor_count') || '0', 10);
      localStorage.setItem('gp_visitor_count', (currentCount + 1).toString());
      console.log('Visitor tracked:', currentCount + 1);
    }
  } catch (e) {
    console.error('Visitor tracking error:', e);
  }
};

export const getVisitorCount = (): number => {
  try {
    return parseInt(localStorage.getItem('gp_visitor_count') || '0', 10);
  } catch {
    return 0;
  }
};
