
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function SMILayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar variant="smi" />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
