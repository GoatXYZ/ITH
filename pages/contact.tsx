import { Layout } from "@/components/Layout";
import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <Layout
      title="Support Ticket - Submit a Request"
      description="Submit a support ticket for technical assistance and help"
    >
      <div className="py-12">
        <ContactForm />
      </div>
    </Layout>
  );
}
