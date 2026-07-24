'use client';

import { useState } from 'react';
import { validateLead, LeadFormData, LeadValidationErrors } from '@/lib/validation';

export default function LeadForm() {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    budget_range: '$5K–25K',
    message: '',
  });

  const [errors, setErrors] = useState<LeadValidationErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const budgetOptions = [
    'Under $1K',
    '$1K–5K',
    '$5K–25K',
    '$25K+',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: LeadFormData) => ({ ...prev, [name]: value }));
    if (errors[name as keyof LeadValidationErrors]) {
      setErrors((prev: LeadValidationErrors) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    
    // Client-side validation
    const validationErrors = validateLead({
      name: formData.name,
      email: formData.email,
      budget_range: formData.budget_range,
      message: formData.message
    });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setServerError(data.message || 'Failed to submit lead. Please try again.');
        if (data.errors) setErrors(data.errors);
      } else {
        setSubmitted(true);
        setFormData({ name: '', email: '', budget_range: '$5K–25K', message: '' });
      }
    } catch (err) {
      setServerError('Network error. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="border-2 border-black bg-[#F4EFE6] p-6 sm:p-8 relative">
      <div className="absolute -top-3 left-6 bg-[#F4EFE6] px-2 font-mono text-[10px] uppercase tracking-[0.22em] text-black">
        form · lead intake
      </div>

      {submitted ? (
        <div className="py-12 text-center space-y-4">
          <div className="w-12 h-12 bg-[#E4572E] text-[#F4EFE6] mx-auto flex items-center justify-center text-xl font-bold font-mono">
            ✓
          </div>
          <h3 className="font-serif text-3xl font-bold text-black italic">Lead Received</h3>
          <p className="text-black/70 font-mono text-[11px] uppercase tracking-[0.1em] max-w-sm mx-auto">
            Logged to ledger. A human will review shortly.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 px-4 py-2 border-2 border-black rounded-none font-mono text-xs uppercase tracking-wider hover:bg-black hover:text-[#F4EFE6] transition-colors"
          >
            File Another Lead →
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {serverError && (
            <div className="p-3 bg-[#E4572E]/10 border-2 border-[#E4572E] text-[#E4572E] text-xs font-mono uppercase tracking-wider">
              {serverError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/60 flex items-center gap-1">
                01 <span>Name</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ada Lovelace"
                className="brutal-input text-[15px]"
              />
              {errors.name && <p className="text-[#E4572E] font-mono text-[10px] mt-1.5 uppercase tracking-wider">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/60 flex items-center gap-1">
                02 <span>Email</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ada@company.com"
                className="brutal-input text-[15px]"
              />
              {errors.email && <p className="text-[#E4572E] font-mono text-[10px] mt-1.5 uppercase tracking-wider">{errors.email}</p>}
            </div>

            {/* Budget Range Field */}
            <div className="md:col-span-2">
              <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/60 flex items-center gap-1">
                03 <span>Budget range</span>
              </label>
              <div className="flex flex-wrap gap-2 mt-3">
                {budgetOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFormData((prev: LeadFormData) => ({ ...prev, budget_range: option }))}
                    className={`px-4 py-2 border-2 font-mono text-xs uppercase tracking-wider transition ${
                      formData.budget_range === option
                        ? 'bg-black text-[#F4EFE6] border-black shadow-sm'
                        : 'border-black text-black hover:bg-black hover:text-[#F4EFE6]'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {errors.budget_range && <p className="text-[#E4572E] font-mono text-[10px] mt-1.5 uppercase tracking-wider">{errors.budget_range}</p>}
            </div>

            {/* Message Field */}
            <div className="md:col-span-2">
              <label htmlFor="message" className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/60 flex items-center gap-1">
                04 <span>What are you building?</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="A short note — the shape of the problem, the timeline, any context."
                className="brutal-input mt-1 resize-none text-[15px]"
              ></textarea>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4 pt-6 border-t-2 border-black">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/50">
              4 fields · est. 38s
            </div>
            
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 bg-black hover:bg-[#E4572E] text-[#F4EFE6] font-mono text-xs uppercase tracking-[0.22em] px-6 h-12 transition-colors disabled:opacity-50"
            >
              {submitting ? (
                <span>Filing...</span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  File submission <span>→</span>
                </span>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
