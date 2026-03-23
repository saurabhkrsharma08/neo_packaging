import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  contact_name: { type: String, required: true },
  contact_email: { type: String, required: true },
  contact_mobile: { type: String, required: true },
  contact_phone: { type: String },
  company_name: { type: String, required: true },
  contact_country: { type: String, required: true },
  contact_address: { type: String, required: true },
  contact_message: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);