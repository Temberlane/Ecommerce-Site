import { createRootRoute, Outlet } from '@tanstack/react-router';
import { CartDrawer } from '../components/CartDrawer';
import { Footer } from '../components/Footer';
import { Nav } from '../components/Nav';
import { NotFound } from '../components/NotFound';
import { SurveyDrawer } from '../components/SurveyDrawer';
import { SurveyFab } from '../components/SurveyFab';
import { Toast } from '../components/Toast';

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootLayout() {
  return (
    <div style={{ minHeight: '100vh', background: '#F6F1E7' }}>
      <Nav />
      <main>
        <Outlet />
      </main>
      <CartDrawer />
      <SurveyDrawer />
      <SurveyFab />
      <Toast />
      <Footer />
    </div>
  );
}
