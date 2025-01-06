import ContactForm from '@/components/email/ContactForm';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-4xl font-bold mb-3 text-gray-900 text-center">We welcome your feedback!</h1>
            <p className="text-gray-600 text-center mb-8 text-lg">
              Send us your suggestions, ideas, criticisms, complaints as well as food ideas!
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}