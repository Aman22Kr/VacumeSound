import { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

// Demo form: validates, then saves the enquiry in THIS browser only. Nothing is sent anywhere.
export default function ContactForm({ compact = false }) {
  const { draft, setDraft, enquiries, setEnquiries } = useApp();
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | saved

  const set = (k) => (e) => { setStatus('idle'); setDraft({ ...draft, [k]: e.target.value }); };

  const validate = () => {
    const er = {};
    if (!draft.name.trim()) er.name = 'Please enter your name.';
    if (!/^[0-9+\-\s()]{7,16}$/.test(draft.mobile.trim())) er.mobile = 'Enter a valid mobile number (7-16 digits).';
    if (draft.email && !/^\S+@\S+\.\S+$/.test(draft.email)) er.email = 'Enter a valid email address.';
    if (!compact && draft.message.trim().length < 10) er.message = 'Please write at least 10 characters.';
    return er;
  };

  const submit = (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) { setStatus('idle'); return; }
    setEnquiries([{ ...draft, id: Date.now(), at: new Date().toISOString() }, ...enquiries].slice(0, 20));
    setDraft({ name: '', mobile: '', email: '', message: '' });
    setStatus('saved');
  };

  const field = (id, label, req, children) => (
    <div key={id}>
      <label htmlFor={id} className="mb-1 block text-xs font-semibold uppercase tracking-wide">{label}{req && ' *'}</label>
      {children}
      {errors[id] && <p className="mt-1 flex items-center gap-1 text-xs text-red-600"><AlertCircle size={12} /> {errors[id]}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      {field('name', 'Name', true, <input id="name" className="field" value={draft.name} onChange={set('name')} autoComplete="name" />)}
      {field('mobile', 'Mobile', true, <input id="mobile" className="field" value={draft.mobile} onChange={set('mobile')} inputMode="tel" autoComplete="tel" />)}
      {field('email', 'Email', false, <input id="email" type="email" className="field" value={draft.email} onChange={set('email')} autoComplete="email" />)}
      {field('message', 'Message', !compact, <textarea id="message" rows={compact ? 3 : 5} className="field" value={draft.message} onChange={set('message')} />)}
      <button type="submit" className="btn-primary w-full">Save demo enquiry</button>
      <p className="text-xs muted">Demo only: your message is saved in this browser (localStorage) and is not sent to anyone. Do not enter sensitive information.</p>
      {status === 'saved' && (
        <p role="status" className="flex items-start gap-2 border border-moss/40 bg-moss/10 p-3 text-sm text-moss dark:text-sand">
          <CheckCircle2 size={16} className="mt-0.5 shrink-0" /> Saved locally in this browser. No message was sent to a real studio.
        </p>
      )}
    </form>
  );
}
