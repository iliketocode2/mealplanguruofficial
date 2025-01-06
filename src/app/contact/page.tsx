import ContactForm from '@/components/email/ContactForm';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-5xl/[60px] font-bold mb-0 text-gray-900 text-center p-4">We welcome your feedback!</h1> 
            <p className="text-gray-700 text-center mb-4 m-auto text-lg p-4 max-w-fit">
              Send us your suggestions, ideas, criticisms, and food ideas!
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}