'use client';

import React, { useState, useTransition } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Star,
  ExternalLink,
  Loader2,
  X,
  Info,
  ShieldAlert,
} from 'lucide-react';
import {
  saveContactPhoneAction,
  deleteContactPhoneAction,
  toggleContactPhoneStatusAction,
  setPrimaryContactPhoneAction,
  reorderContactPhonesAction,
  saveContactEmailAction,
  deleteContactEmailAction,
  toggleContactEmailStatusAction,
  setPrimaryContactEmailAction,
  reorderContactEmailsAction,
  saveContactAddressAction,
  deleteContactAddressAction,
  toggleContactAddressStatusAction,
  setPrimaryContactAddressAction,
  reorderContactAddressesAction,
} from '@/server/actions/admin';

export interface ContactPhoneItem {
  id: string;
  phoneNumber: string;
  role: string;
  description: string | null;
  displayOrder: number;
  isPrimary: boolean;
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ContactEmailItem {
  id: string;
  email: string;
  role: string;
  description: string | null;
  displayOrder: number;
  isPrimary: boolean;
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ContactAddressItem {
  id: string;
  label: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  pincode: string | null;
  country: string;
  mapUrl: string | null;
  directionsUrl: string | null;
  isPrimary: boolean;
  isActive: boolean;
  displayOrder: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface ContactSettingsManagerProps {
  initialPhones: ContactPhoneItem[];
  initialEmails: ContactEmailItem[];
  initialAddresses: ContactAddressItem[];
}

type TabType = 'phones' | 'emails' | 'addresses';

export default function ContactSettingsManagerClient({
  initialPhones,
  initialEmails,
  initialAddresses,
}: ContactSettingsManagerProps) {
  const [activeTab, setActiveTab] = useState<TabType>('phones');

  // Data states
  const [phones, setPhones] = useState<ContactPhoneItem[]>(initialPhones);
  const [emails, setEmails] = useState<ContactEmailItem[]>(initialEmails);
  const [addresses, setAddresses] = useState<ContactAddressItem[]>(initialAddresses);

  // Transition & Feedback
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Phone Modal State
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [editingPhone, setEditingPhone] = useState<ContactPhoneItem | null>(null);
  const [phoneFormData, setPhoneFormData] = useState({
    phoneNumber: '',
    role: '',
    description: '',
    displayOrder: 0,
    isPrimary: false,
    isActive: true,
  });
  const [phoneErrors, setPhoneErrors] = useState<Record<string, string>>({});

  // Email Modal State
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [editingEmail, setEditingEmail] = useState<ContactEmailItem | null>(null);
  const [emailFormData, setEmailFormData] = useState({
    email: '',
    role: '',
    description: '',
    displayOrder: 0,
    isPrimary: false,
    isActive: true,
  });
  const [emailErrors, setEmailErrors] = useState<Record<string, string>>({});

  // Address Modal State
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<ContactAddressItem | null>(null);
  const [addressFormData, setAddressFormData] = useState({
    label: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    mapUrl: '',
    directionsUrl: '',
    displayOrder: 0,
    isPrimary: false,
    isActive: true,
  });
  const [addressErrors, setAddressErrors] = useState<Record<string, string>>({});

  // Delete Confirmation Modal State
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    type: TabType;
    id: string;
    label: string;
    isPrimary: boolean;
    isLastActive: boolean;
  }>({
    open: false,
    type: 'phones',
    id: '',
    label: '',
    isPrimary: false,
    isLastActive: false,
  });

  const clearFeedback = () => setFeedback(null);

  // ==========================================
  // PHONE HANDLERS
  // ==========================================

  const handleOpenAddPhone = () => {
    setEditingPhone(null);
    setPhoneFormData({
      phoneNumber: '',
      role: '',
      description: '',
      displayOrder: phones.length + 1,
      isPrimary: phones.length === 0,
      isActive: true,
    });
    setPhoneErrors({});
    setPhoneModalOpen(true);
  };

  const handleOpenEditPhone = (item: ContactPhoneItem) => {
    setEditingPhone(item);
    setPhoneFormData({
      phoneNumber: item.phoneNumber,
      role: item.role,
      description: item.description || '',
      displayOrder: item.displayOrder,
      isPrimary: item.isPrimary,
      isActive: item.isActive,
    });
    setPhoneErrors({});
    setPhoneModalOpen(true);
  };

  const validatePhone = () => {
    const errors: Record<string, string> = {};
    const trimmedNumber = phoneFormData.phoneNumber.trim();
    const trimmedRole = phoneFormData.role.trim();

    if (!trimmedNumber) {
      errors.phoneNumber = 'Phone number is required';
    } else if (trimmedNumber.length < 7 || trimmedNumber.length > 40) {
      errors.phoneNumber = 'Phone number must be between 7 and 40 characters';
    } else if (!/^[0-9+\s\-().]+$/.test(trimmedNumber)) {
      errors.phoneNumber = 'Invalid phone number format. Only numbers, +, -, (), and spaces allowed.';
    }

    if (!trimmedRole) {
      errors.role = 'Role / Label is required (e.g. Founder & CEO)';
    } else if (trimmedRole.length < 2 || trimmedRole.length > 120) {
      errors.role = 'Role must be between 2 and 120 characters';
    }

    if (phoneFormData.description && phoneFormData.description.length > 255) {
      errors.description = 'Description cannot exceed 255 characters';
    }

    setPhoneErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSavePhone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone()) return;

    startTransition(async () => {
      const payload = {
        id: editingPhone ? editingPhone.id : undefined,
        phoneNumber: phoneFormData.phoneNumber.trim(),
        role: phoneFormData.role.trim(),
        description: phoneFormData.description.trim() || null,
        displayOrder: Number(phoneFormData.displayOrder),
        isPrimary: Boolean(phoneFormData.isPrimary),
        isActive: Boolean(phoneFormData.isActive),
      };

      const res = await saveContactPhoneAction(payload);
      if (res.success) {
        setFeedback({ type: 'success', message: res.message || 'Updated successfully.' });
        setPhoneModalOpen(false);
        // Refresh local state
        if (editingPhone) {
          setPhones((prev) =>
            prev.map((p) => {
              if (p.id === editingPhone.id) {
                return { ...p, ...payload, id: p.id, createdAt: p.createdAt, updatedAt: new Date().toISOString() };
              }
              // If this was marked primary, unmark others
              if (payload.isPrimary) {
                return { ...p, isPrimary: false };
              }
              return p;
            })
          );
        } else if (res.phone) {
          const newPhone = res.phone as unknown as ContactPhoneItem;
          setPhones((prev) => {
            const updated = payload.isPrimary ? prev.map((p) => ({ ...p, isPrimary: false })) : [...prev];
            return [...updated, newPhone].sort((a, b) => a.displayOrder - b.displayOrder);
          });
        }
      } else {
        setFeedback({ type: 'error', message: res.error?.message || 'Failed to save phone number.' });
      }
    });
  };

  const handleTogglePhoneStatus = (id: string, currentActive: boolean) => {
    const activeCount = phones.filter((p) => p.isActive).length;
    if (currentActive && activeCount <= 1) {
      setFeedback({
        type: 'error',
        message: 'Cannot disable the only active phone number. Please add another active phone number first.',
      });
      return;
    }

    startTransition(async () => {
      const res = await toggleContactPhoneStatusAction(id, !currentActive);
      if (res.success) {
        setFeedback({ type: 'success', message: res.message || 'Updated successfully.' });
        setPhones((prev) =>
          prev.map((p) => {
            if (p.id === id) {
              return { ...p, isActive: !currentActive, isPrimary: !currentActive ? p.isPrimary : false };
            }
            return p;
          })
        );
      } else {
        setFeedback({ type: 'error', message: res.error?.message || 'Failed to update status.' });
      }
    });
  };

  const handleSetPrimaryPhone = (id: string) => {
    startTransition(async () => {
      const res = await setPrimaryContactPhoneAction(id);
      if (res.success) {
        setFeedback({ type: 'success', message: res.message || 'Updated successfully.' });
        setPhones((prev) =>
          prev.map((p) => ({
            ...p,
            isPrimary: p.id === id,
            isActive: p.id === id ? true : p.isActive,
          }))
        );
      } else {
        setFeedback({ type: 'error', message: res.error?.message || 'Failed to set primary phone.' });
      }
    });
  };

  const handleMovePhone = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= phones.length) return;

    const newPhones = [...phones];
    const temp = newPhones[index];
    newPhones[index] = newPhones[targetIndex];
    newPhones[targetIndex] = temp;

    const reordered = newPhones.map((p, idx) => ({ ...p, displayOrder: idx + 1 }));
    setPhones(reordered);

    startTransition(async () => {
      const payload = reordered.map((p) => ({ id: p.id, displayOrder: p.displayOrder }));
      const res = await reorderContactPhonesAction(payload);
      if (!res.success) {
        setFeedback({ type: 'error', message: res.error?.message || 'Failed to reorder phone numbers.' });
      }
    });
  };

  // ==========================================
  // EMAIL HANDLERS
  // ==========================================

  const handleOpenAddEmail = () => {
    setEditingEmail(null);
    setEmailFormData({
      email: '',
      role: '',
      description: '',
      displayOrder: emails.length + 1,
      isPrimary: emails.length === 0,
      isActive: true,
    });
    setEmailErrors({});
    setEmailModalOpen(true);
  };

  const handleOpenEditEmail = (item: ContactEmailItem) => {
    setEditingEmail(item);
    setEmailFormData({
      email: item.email,
      role: item.role,
      description: item.description || '',
      displayOrder: item.displayOrder,
      isPrimary: item.isPrimary,
      isActive: item.isActive,
    });
    setEmailErrors({});
    setEmailModalOpen(true);
  };

  const validateEmail = () => {
    const errors: Record<string, string> = {};
    const trimmedEmail = emailFormData.email.trim();
    const trimmedRole = emailFormData.role.trim();

    if (!trimmedEmail) {
      errors.email = 'Email address is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(trimmedEmail)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!trimmedRole) {
      errors.role = 'Role / Label is required';
    } else if (trimmedRole.length < 2 || trimmedRole.length > 120) {
      errors.role = 'Role must be between 2 and 120 characters';
    }

    if (emailFormData.description && emailFormData.description.length > 255) {
      errors.description = 'Description cannot exceed 255 characters';
    }

    setEmailErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail()) return;

    startTransition(async () => {
      const payload = {
        id: editingEmail ? editingEmail.id : undefined,
        email: emailFormData.email.trim().toLowerCase(),
        role: emailFormData.role.trim(),
        description: emailFormData.description.trim() || null,
        displayOrder: Number(emailFormData.displayOrder),
        isPrimary: Boolean(emailFormData.isPrimary),
        isActive: Boolean(emailFormData.isActive),
      };

      const res = await saveContactEmailAction(payload);
      if (res.success) {
        setFeedback({ type: 'success', message: res.message || 'Updated successfully.' });
        setEmailModalOpen(false);
        if (editingEmail) {
          setEmails((prev) =>
            prev.map((m) => {
              if (m.id === editingEmail.id) {
                return { ...m, ...payload, id: m.id, createdAt: m.createdAt, updatedAt: new Date().toISOString() };
              }
              if (payload.isPrimary) {
                return { ...m, isPrimary: false };
              }
              return m;
            })
          );
        } else if (res.email) {
          const newEmail = res.email as unknown as ContactEmailItem;
          setEmails((prev) => {
            const updated = payload.isPrimary ? prev.map((m) => ({ ...m, isPrimary: false })) : [...prev];
            return [...updated, newEmail].sort((a, b) => a.displayOrder - b.displayOrder);
          });
        }
      } else {
        setFeedback({ type: 'error', message: res.error?.message || 'Failed to save email address.' });
      }
    });
  };

  const handleToggleEmailStatus = (id: string, currentActive: boolean) => {
    const activeCount = emails.filter((e) => e.isActive).length;
    if (currentActive && activeCount <= 1) {
      setFeedback({
        type: 'error',
        message: 'Cannot disable the only active email address.',
      });
      return;
    }

    startTransition(async () => {
      const res = await toggleContactEmailStatusAction(id, !currentActive);
      if (res.success) {
        setFeedback({ type: 'success', message: res.message || 'Updated successfully.' });
        setEmails((prev) =>
          prev.map((e) => {
            if (e.id === id) {
              return { ...e, isActive: !currentActive, isPrimary: !currentActive ? e.isPrimary : false };
            }
            return e;
          })
        );
      } else {
        setFeedback({ type: 'error', message: res.error?.message || 'Failed to update status.' });
      }
    });
  };

  const handleSetPrimaryEmail = (id: string) => {
    startTransition(async () => {
      const res = await setPrimaryContactEmailAction(id);
      if (res.success) {
        setFeedback({ type: 'success', message: res.message || 'Updated successfully.' });
        setEmails((prev) =>
          prev.map((e) => ({
            ...e,
            isPrimary: e.id === id,
            isActive: e.id === id ? true : e.isActive,
          }))
        );
      } else {
        setFeedback({ type: 'error', message: res.error?.message || 'Failed to set primary email.' });
      }
    });
  };

  const handleMoveEmail = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= emails.length) return;

    const newEmails = [...emails];
    const temp = newEmails[index];
    newEmails[index] = newEmails[targetIndex];
    newEmails[targetIndex] = temp;

    const reordered = newEmails.map((m, idx) => ({ ...m, displayOrder: idx + 1 }));
    setEmails(reordered);

    startTransition(async () => {
      const payload = reordered.map((m) => ({ id: m.id, displayOrder: m.displayOrder }));
      const res = await reorderContactEmailsAction(payload);
      if (!res.success) {
        setFeedback({ type: 'error', message: res.error?.message || 'Failed to reorder email addresses.' });
      }
    });
  };

  // ==========================================
  // ADDRESS HANDLERS
  // ==========================================

  const handleOpenAddAddress = () => {
    setEditingAddress(null);
    setAddressFormData({
      label: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India',
      mapUrl: '',
      directionsUrl: '',
      displayOrder: addresses.length + 1,
      isPrimary: addresses.length === 0,
      isActive: true,
    });
    setAddressErrors({});
    setAddressModalOpen(true);
  };

  const handleOpenEditAddress = (item: ContactAddressItem) => {
    setEditingAddress(item);
    setAddressFormData({
      label: item.label,
      addressLine1: item.addressLine1,
      addressLine2: item.addressLine2 || '',
      city: item.city,
      state: item.state,
      pincode: item.pincode || '',
      country: item.country || 'India',
      mapUrl: item.mapUrl || '',
      directionsUrl: item.directionsUrl || '',
      displayOrder: item.displayOrder,
      isPrimary: item.isPrimary,
      isActive: item.isActive,
    });
    setAddressErrors({});
    setAddressModalOpen(true);
  };

  const validateAddress = () => {
    const errors: Record<string, string> = {};
    if (!addressFormData.label.trim()) errors.label = 'Address label is required (e.g. Head Office)';
    if (!addressFormData.addressLine1.trim()) errors.addressLine1 = 'Address Line 1 is required';
    if (!addressFormData.city.trim()) errors.city = 'City is required';
    if (!addressFormData.state.trim()) errors.state = 'State is required';

    if (addressFormData.mapUrl && !addressFormData.mapUrl.startsWith('http')) {
      errors.mapUrl = 'Google Maps URL must start with http:// or https://';
    }
    if (addressFormData.directionsUrl && !addressFormData.directionsUrl.startsWith('http')) {
      errors.directionsUrl = 'Directions URL must start with http:// or https://';
    }

    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAddress()) return;

    startTransition(async () => {
      const payload = {
        id: editingAddress ? editingAddress.id : undefined,
        label: addressFormData.label.trim(),
        addressLine1: addressFormData.addressLine1.trim(),
        addressLine2: addressFormData.addressLine2.trim() || null,
        city: addressFormData.city.trim(),
        state: addressFormData.state.trim(),
        pincode: addressFormData.pincode.trim() || null,
        country: addressFormData.country.trim() || 'India',
        mapUrl: addressFormData.mapUrl.trim() || null,
        directionsUrl: addressFormData.directionsUrl.trim() || null,
        displayOrder: Number(addressFormData.displayOrder),
        isPrimary: Boolean(addressFormData.isPrimary),
        isActive: Boolean(addressFormData.isActive),
      };

      const res = await saveContactAddressAction(payload);
      if (res.success) {
        setFeedback({ type: 'success', message: res.message || 'Updated successfully.' });
        setAddressModalOpen(false);
        if (editingAddress) {
          setAddresses((prev) =>
            prev.map((a) => {
              if (a.id === editingAddress.id) {
                return { ...a, ...payload, id: a.id, createdAt: a.createdAt, updatedAt: new Date().toISOString() };
              }
              if (payload.isPrimary) {
                return { ...a, isPrimary: false };
              }
              return a;
            })
          );
        } else if (res.address) {
          const newAddress = res.address as unknown as ContactAddressItem;
          setAddresses((prev) => {
            const updated = payload.isPrimary ? prev.map((a) => ({ ...a, isPrimary: false })) : [...prev];
            return [...updated, newAddress].sort((a, b) => a.displayOrder - b.displayOrder);
          });
        }
      } else {
        setFeedback({ type: 'error', message: res.error?.message || 'Failed to save address.' });
      }
    });
  };

  const handleToggleAddressStatus = (id: string, currentActive: boolean) => {
    const activeCount = addresses.filter((a) => a.isActive).length;
    if (currentActive && activeCount <= 1) {
      setFeedback({
        type: 'error',
        message: 'Cannot disable the only active office address.',
      });
      return;
    }

    startTransition(async () => {
      const res = await toggleContactAddressStatusAction(id, !currentActive);
      if (res.success) {
        setFeedback({ type: 'success', message: res.message || 'Updated successfully.' });
        setAddresses((prev) =>
          prev.map((a) => {
            if (a.id === id) {
              return { ...a, isActive: !currentActive, isPrimary: !currentActive ? a.isPrimary : false };
            }
            return a;
          })
        );
      } else {
        setFeedback({ type: 'error', message: res.error?.message || 'Failed to update address status.' });
      }
    });
  };

  const handleSetPrimaryAddress = (id: string) => {
    startTransition(async () => {
      const res = await setPrimaryContactAddressAction(id);
      if (res.success) {
        setFeedback({ type: 'success', message: res.message || 'Updated successfully.' });
        setAddresses((prev) =>
          prev.map((a) => ({
            ...a,
            isPrimary: a.id === id,
            isActive: a.id === id ? true : a.isActive,
          }))
        );
      } else {
        setFeedback({ type: 'error', message: res.error?.message || 'Failed to set primary address.' });
      }
    });
  };

  const handleMoveAddress = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= addresses.length) return;

    const newAddresses = [...addresses];
    const temp = newAddresses[index];
    newAddresses[index] = newAddresses[targetIndex];
    newAddresses[targetIndex] = temp;

    const reordered = newAddresses.map((a, idx) => ({ ...a, displayOrder: idx + 1 }));
    setAddresses(reordered);

    startTransition(async () => {
      const payload = reordered.map((a) => ({ id: a.id, displayOrder: a.displayOrder }));
      const res = await reorderContactAddressesAction(payload);
      if (!res.success) {
        setFeedback({ type: 'error', message: res.error?.message || 'Failed to reorder addresses.' });
      }
    });
  };

  // ==========================================
  // DELETE HANDLERS & CONFIRMATION
  // ==========================================

  const promptDelete = (type: TabType, id: string, label: string, isPrimary: boolean, isActive: boolean) => {
    let activeCount = 0;
    if (type === 'phones') {
      activeCount = phones.filter((p) => p.isActive).length;
    } else if (type === 'emails') {
      activeCount = emails.filter((e) => e.isActive).length;
    } else {
      activeCount = addresses.filter((a) => a.isActive).length;
    }

    const isLastActive = isActive && activeCount <= 1;

    setDeleteModal({
      open: true,
      type,
      id,
      label,
      isPrimary,
      isLastActive,
    });
  };

  const handleConfirmDelete = () => {
    if (deleteModal.isLastActive) {
      setFeedback({
        type: 'error',
        message: `Deletion Blocked: You cannot delete the only active ${deleteModal.type === 'phones' ? 'phone number' : deleteModal.type === 'emails' ? 'email address' : 'address'}. Please add another active entry first.`,
      });
      setDeleteModal((prev) => ({ ...prev, open: false }));
      return;
    }

    startTransition(async () => {
      let res: { success: boolean; message?: string; error?: { message: string } };
      if (deleteModal.type === 'phones') {
        res = await deleteContactPhoneAction(deleteModal.id);
        if (res.success) {
          setPhones((prev) => {
            const filtered = prev.filter((p) => p.id !== deleteModal.id);
            if (deleteModal.isPrimary && filtered.some((p) => p.isActive)) {
              // Mark first active as primary in UI
              const nextActive = filtered.find((p) => p.isActive);
              if (nextActive) nextActive.isPrimary = true;
            }
            return filtered;
          });
        }
      } else if (deleteModal.type === 'emails') {
        res = await deleteContactEmailAction(deleteModal.id);
        if (res.success) {
          setEmails((prev) => {
            const filtered = prev.filter((e) => e.id !== deleteModal.id);
            if (deleteModal.isPrimary && filtered.some((e) => e.isActive)) {
              const nextActive = filtered.find((e) => e.isActive);
              if (nextActive) nextActive.isPrimary = true;
            }
            return filtered;
          });
        }
      } else {
        res = await deleteContactAddressAction(deleteModal.id);
        if (res.success) {
          setAddresses((prev) => {
            const filtered = prev.filter((a) => a.id !== deleteModal.id);
            if (deleteModal.isPrimary && filtered.some((a) => a.isActive)) {
              const nextActive = filtered.find((a) => a.isActive);
              if (nextActive) nextActive.isPrimary = true;
            }
            return filtered;
          });
        }
      }

      if (res.success) {
        setFeedback({ type: 'success', message: res.message || 'Item deleted successfully.' });
      } else {
        setFeedback({ type: 'error', message: res.error?.message || 'Failed to delete item.' });
      }
      setDeleteModal((prev) => ({ ...prev, open: false }));
    });
  };

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-xl flex items-start gap-3 text-xs sm:text-sm border transition-all ${
            feedback.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
              : 'bg-red-950/40 border-red-800 text-red-300'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          )}
          <div className="flex-1 font-medium">{feedback.message}</div>
          <button
            onClick={clearFeedback}
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Tabs Header */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
        <button
          type="button"
          onClick={() => setActiveTab('phones')}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'phones'
              ? 'bg-[#FFE000] text-black shadow-md shadow-[#FFE000]/20'
              : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>Phone Numbers</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
              activeTab === 'phones' ? 'bg-black text-[#FFE000]' : 'bg-white/10 text-zinc-300'
            }`}
          >
            {phones.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('emails')}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'emails'
              ? 'bg-[#FFE000] text-black shadow-md shadow-[#FFE000]/20'
              : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Email Addresses</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
              activeTab === 'emails' ? 'bg-black text-[#FFE000]' : 'bg-white/10 text-zinc-300'
            }`}
          >
            {emails.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('addresses')}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'addresses'
              ? 'bg-[#FFE000] text-black shadow-md shadow-[#FFE000]/20'
              : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Office Addresses</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
              activeTab === 'addresses' ? 'bg-black text-[#FFE000]' : 'bg-white/10 text-zinc-300'
            }`}
          >
            {addresses.length}
          </span>
        </button>
      </div>

      {/* ========================================================
          TAB 1: PHONE NUMBERS
      ======================================================== */}
      {activeTab === 'phones' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#111111] p-4 rounded-xl border border-white/10">
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-wide">
                Dynamic Phone Numbers
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Manage roles (e.g. Founder & CEO, Admissions, Partnerships), primary numbers, ordering, and active status.
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenAddPhone}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#6CD34A] hover:bg-[#58b738] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Phone Number</span>
            </button>
          </div>

          {/* Phone Numbers Table / List */}
          <div className="rounded-xl border border-white/10 bg-[#0E0E0E] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 border-b border-white/10 text-zinc-400 uppercase font-mono tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Order</th>
                    <th className="py-3 px-4">Role / Label</th>
                    <th className="py-3 px-4">Phone Number</th>
                    <th className="py-3 px-4">Description / Hours</th>
                    <th className="py-3 px-4 text-center">Primary</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {phones.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-zinc-500">
                        No phone numbers added yet. Click &quot;Add Phone Number&quot; to create one.
                      </td>
                    </tr>
                  ) : (
                    phones.map((phone, idx) => (
                      <tr
                        key={phone.id}
                        className={`hover:bg-white/[0.02] transition-colors ${
                          !phone.isActive ? 'opacity-60 bg-red-950/5' : ''
                        }`}
                      >
                        {/* Order & Reorder Controls */}
                        <td className="py-3.5 px-4 font-mono">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-zinc-400 w-5">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <div className="flex flex-col">
                              <button
                                type="button"
                                disabled={idx === 0 || isPending}
                                onClick={() => handleMovePhone(idx, 'up')}
                                className="p-0.5 text-zinc-500 hover:text-white disabled:opacity-20 cursor-pointer"
                                title="Move Up"
                              >
                                <ArrowUp className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                disabled={idx === phones.length - 1 || isPending}
                                onClick={() => handleMovePhone(idx, 'down')}
                                className="p-0.5 text-zinc-500 hover:text-white disabled:opacity-20 cursor-pointer"
                                title="Move Down"
                              >
                                <ArrowDown className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Role / Label */}
                        <td className="py-3.5 px-4 font-semibold text-white">
                          <div className="flex items-center gap-2">
                            <span>{phone.role}</span>
                            {phone.isPrimary && (
                              <span className="px-2 py-0.5 rounded bg-[#FFE000]/15 text-[#FFE000] border border-[#FFE000]/40 text-[10px] font-bold uppercase tracking-wider font-mono">
                                PRIMARY
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Phone Number */}
                        <td className="py-3.5 px-4">
                          <a
                            href={`tel:${phone.phoneNumber.replace(/\s+/g, '')}`}
                            className="font-mono text-zinc-200 hover:text-[#6CD34A] transition-colors font-medium flex items-center gap-1.5"
                          >
                            <Phone className="w-3 h-3 text-[#6CD34A]" />
                            <span>{phone.phoneNumber}</span>
                          </a>
                        </td>

                        {/* Description */}
                        <td className="py-3.5 px-4 text-zinc-400 max-w-xs truncate">
                          {phone.description || <span className="text-zinc-600">—</span>}
                        </td>

                        {/* Primary Badge / Action */}
                        <td className="py-3.5 px-4 text-center">
                          {phone.isPrimary ? (
                            <span className="inline-flex items-center gap-1 text-[#FFE000] font-bold text-[11px]">
                              <Star className="w-3.5 h-3.5 fill-[#FFE000]" />
                              <span>Default</span>
                            </span>
                          ) : (
                            <button
                              type="button"
                              disabled={isPending || !phone.isActive}
                              onClick={() => handleSetPrimaryPhone(phone.id)}
                              className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white text-[11px] font-medium transition-colors disabled:opacity-30 cursor-pointer"
                              title="Set as Primary contact"
                            >
                              Make Primary
                            </button>
                          )}
                        </td>

                        {/* Status Toggle */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() => handleTogglePhoneStatus(phone.id, phone.isActive)}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                              phone.isActive
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800 hover:bg-emerald-900'
                                : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700'
                            }`}
                          >
                            {phone.isActive ? 'Active' : 'Disabled'}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEditPhone(phone)}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                              title="Edit phone"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                promptDelete('phones', phone.id, `${phone.phoneNumber} (${phone.role})`, phone.isPrimary, phone.isActive)
                              }
                              className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-950/60 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                              title="Delete phone"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 2: EMAIL ADDRESSES
      ======================================================== */}
      {activeTab === 'emails' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#111111] p-4 rounded-xl border border-white/10">
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-wide">
                Dynamic Email Addresses
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Manage roles (e.g. General Enquiries, Admissions, Partnerships), primary email, ordering, and active status.
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenAddEmail}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#6CD34A] hover:bg-[#58b738] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Email Address</span>
            </button>
          </div>

          {/* Email Table */}
          <div className="rounded-xl border border-white/10 bg-[#0E0E0E] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 border-b border-white/10 text-zinc-400 uppercase font-mono tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Order</th>
                    <th className="py-3 px-4">Role / Label</th>
                    <th className="py-3 px-4">Email Address</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4 text-center">Primary</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {emails.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-zinc-500">
                        No email addresses added yet. Click &quot;Add Email Address&quot; to create one.
                      </td>
                    </tr>
                  ) : (
                    emails.map((emailItem, idx) => (
                      <tr
                        key={emailItem.id}
                        className={`hover:bg-white/[0.02] transition-colors ${
                          !emailItem.isActive ? 'opacity-60 bg-red-950/5' : ''
                        }`}
                      >
                        {/* Order & Reorder Controls */}
                        <td className="py-3.5 px-4 font-mono">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-zinc-400 w-5">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <div className="flex flex-col">
                              <button
                                type="button"
                                disabled={idx === 0 || isPending}
                                onClick={() => handleMoveEmail(idx, 'up')}
                                className="p-0.5 text-zinc-500 hover:text-white disabled:opacity-20 cursor-pointer"
                                title="Move Up"
                              >
                                <ArrowUp className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                disabled={idx === emails.length - 1 || isPending}
                                onClick={() => handleMoveEmail(idx, 'down')}
                                className="p-0.5 text-zinc-500 hover:text-white disabled:opacity-20 cursor-pointer"
                                title="Move Down"
                              >
                                <ArrowDown className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Role / Label */}
                        <td className="py-3.5 px-4 font-semibold text-white">
                          <div className="flex items-center gap-2">
                            <span>{emailItem.role}</span>
                            {emailItem.isPrimary && (
                              <span className="px-2 py-0.5 rounded bg-[#FFE000]/15 text-[#FFE000] border border-[#FFE000]/40 text-[10px] font-bold uppercase tracking-wider font-mono">
                                PRIMARY
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Email Address */}
                        <td className="py-3.5 px-4">
                          <a
                            href={`mailto:${emailItem.email}`}
                            className="font-mono text-zinc-200 hover:text-[#6CD34A] transition-colors font-medium flex items-center gap-1.5"
                          >
                            <Mail className="w-3 h-3 text-[#6CD34A]" />
                            <span>{emailItem.email}</span>
                          </a>
                        </td>

                        {/* Description */}
                        <td className="py-3.5 px-4 text-zinc-400 max-w-xs truncate">
                          {emailItem.description || <span className="text-zinc-600">—</span>}
                        </td>

                        {/* Primary Badge / Action */}
                        <td className="py-3.5 px-4 text-center">
                          {emailItem.isPrimary ? (
                            <span className="inline-flex items-center gap-1 text-[#FFE000] font-bold text-[11px]">
                              <Star className="w-3.5 h-3.5 fill-[#FFE000]" />
                              <span>Default</span>
                            </span>
                          ) : (
                            <button
                              type="button"
                              disabled={isPending || !emailItem.isActive}
                              onClick={() => handleSetPrimaryEmail(emailItem.id)}
                              className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white text-[11px] font-medium transition-colors disabled:opacity-30 cursor-pointer"
                            >
                              Make Primary
                            </button>
                          )}
                        </td>

                        {/* Status Toggle */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() => handleToggleEmailStatus(emailItem.id, emailItem.isActive)}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                              emailItem.isActive
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800 hover:bg-emerald-900'
                                : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700'
                            }`}
                          >
                            {emailItem.isActive ? 'Active' : 'Disabled'}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEditEmail(emailItem)}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                              title="Edit email"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                promptDelete('emails', emailItem.id, `${emailItem.email} (${emailItem.role})`, emailItem.isPrimary, emailItem.isActive)
                              }
                              className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-950/60 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                              title="Delete email"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 3: OFFICE ADDRESSES
      ======================================================== */}
      {activeTab === 'addresses' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#111111] p-4 rounded-xl border border-white/10">
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-wide">
                Dynamic Office & Academy Locations
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Manage head office, training centers, Google Maps URLs, directions links, primary address, and ordering.
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenAddAddress}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#6CD34A] hover:bg-[#58b738] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Address</span>
            </button>
          </div>

          {/* Address Table */}
          <div className="rounded-xl border border-white/10 bg-[#0E0E0E] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 border-b border-white/10 text-zinc-400 uppercase font-mono tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Order</th>
                    <th className="py-3 px-4">Label</th>
                    <th className="py-3 px-4">Address Details</th>
                    <th className="py-3 px-4">City / State</th>
                    <th className="py-3 px-4">Map & Directions</th>
                    <th className="py-3 px-4 text-center">Primary</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {addresses.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-zinc-500">
                        No addresses added yet. Click &quot;Add Address&quot; to create one.
                      </td>
                    </tr>
                  ) : (
                    addresses.map((addr, idx) => (
                      <tr
                        key={addr.id}
                        className={`hover:bg-white/[0.02] transition-colors ${
                          !addr.isActive ? 'opacity-60 bg-red-950/5' : ''
                        }`}
                      >
                        {/* Order & Reorder Controls */}
                        <td className="py-3.5 px-4 font-mono">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-zinc-400 w-5">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <div className="flex flex-col">
                              <button
                                type="button"
                                disabled={idx === 0 || isPending}
                                onClick={() => handleMoveAddress(idx, 'up')}
                                className="p-0.5 text-zinc-500 hover:text-white disabled:opacity-20 cursor-pointer"
                                title="Move Up"
                              >
                                <ArrowUp className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                disabled={idx === addresses.length - 1 || isPending}
                                onClick={() => handleMoveAddress(idx, 'down')}
                                className="p-0.5 text-zinc-500 hover:text-white disabled:opacity-20 cursor-pointer"
                                title="Move Down"
                              >
                                <ArrowDown className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Label */}
                        <td className="py-3.5 px-4 font-semibold text-white">
                          <div className="flex items-center gap-2">
                            <span>{addr.label}</span>
                            {addr.isPrimary && (
                              <span className="px-2 py-0.5 rounded bg-[#FFE000]/15 text-[#FFE000] border border-[#FFE000]/40 text-[10px] font-bold uppercase tracking-wider font-mono">
                                PRIMARY
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Address Lines */}
                        <td className="py-3.5 px-4 text-zinc-300 max-w-sm">
                          <p className="line-clamp-2">
                            {addr.addressLine1}
                            {addr.addressLine2 ? `, ${addr.addressLine2}` : ''}
                          </p>
                        </td>

                        {/* City, State, Pin */}
                        <td className="py-3.5 px-4 text-zinc-400 font-mono">
                          {addr.city}, {addr.state} {addr.pincode ? `(${addr.pincode})` : ''}
                        </td>

                        {/* Map & Directions Links */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            {addr.mapUrl ? (
                              <a
                                href={addr.mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#6CD34A] hover:underline inline-flex items-center gap-1 font-medium"
                              >
                                <span>Map</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <span className="text-zinc-600">—</span>
                            )}
                            {addr.directionsUrl && (
                              <a
                                href={addr.directionsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#FFE000] hover:underline inline-flex items-center gap-1 font-medium"
                              >
                                <span>Directions</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </td>

                        {/* Primary Badge / Action */}
                        <td className="py-3.5 px-4 text-center">
                          {addr.isPrimary ? (
                            <span className="inline-flex items-center gap-1 text-[#FFE000] font-bold text-[11px]">
                              <Star className="w-3.5 h-3.5 fill-[#FFE000]" />
                              <span>Default</span>
                            </span>
                          ) : (
                            <button
                              type="button"
                              disabled={isPending || !addr.isActive}
                              onClick={() => handleSetPrimaryAddress(addr.id)}
                              className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white text-[11px] font-medium transition-colors disabled:opacity-30 cursor-pointer"
                            >
                              Make Primary
                            </button>
                          )}
                        </td>

                        {/* Status Toggle */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() => handleToggleAddressStatus(addr.id, addr.isActive)}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                              addr.isActive
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800 hover:bg-emerald-900'
                                : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700'
                            }`}
                          >
                            {addr.isActive ? 'Active' : 'Disabled'}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEditAddress(addr)}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                              title="Edit address"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                promptDelete('addresses', addr.id, addr.label, addr.isPrimary, addr.isActive)
                              }
                              className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-950/60 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                              title="Delete address"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: ADD / EDIT PHONE NUMBER
      ======================================================== */}
      {phoneModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-white/15 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#6CD34A]/20 text-[#6CD34A] flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white uppercase tracking-wide">
                  {editingPhone ? 'Edit Phone Number' : 'Add Phone Number'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPhoneModalOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePhone} className="p-5 space-y-4">
              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. +91 8826433044"
                  value={phoneFormData.phoneNumber}
                  onChange={(e) => setPhoneFormData({ ...phoneFormData, phoneNumber: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-black border text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#6CD34A] ${
                    phoneErrors.phoneNumber ? 'border-red-500' : 'border-white/10'
                  }`}
                />
                {phoneErrors.phoneNumber && (
                  <p className="text-[11px] text-red-400 mt-1">{phoneErrors.phoneNumber}</p>
                )}
                <p className="text-[10px] text-zinc-500 mt-1">
                  Supports country code, spaces, and dashes (e.g. +91 8826433044).
                </p>
              </div>

              {/* Role / Label */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Role / Label <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Founder & CEO, Admissions & Enquiries, School Partnerships"
                  value={phoneFormData.role}
                  onChange={(e) => setPhoneFormData({ ...phoneFormData, role: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-black border text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#6CD34A] ${
                    phoneErrors.role ? 'border-red-500' : 'border-white/10'
                  }`}
                />
                {phoneErrors.role && (
                  <p className="text-[11px] text-red-400 mt-1">{phoneErrors.role}</p>
                )}
              </div>

              {/* Description / Timing */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Description / Timing (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mon - Sat, 9:00 AM - 6:00 PM"
                  value={phoneFormData.description}
                  onChange={(e) => setPhoneFormData({ ...phoneFormData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#6CD34A]"
                />
                {phoneErrors.description && (
                  <p className="text-[11px] text-red-400 mt-1">{phoneErrors.description}</p>
                )}
              </div>

              {/* Display Order */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  min={0}
                  value={phoneFormData.displayOrder}
                  onChange={(e) => setPhoneFormData({ ...phoneFormData, displayOrder: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-[#6CD34A]"
                />
              </div>

              {/* Checkboxes: Primary & Active */}
              <div className="pt-2 flex flex-col gap-2.5 bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={phoneFormData.isPrimary}
                    onChange={(e) => setPhoneFormData({ ...phoneFormData, isPrimary: e.target.checked })}
                    className="w-4 h-4 rounded text-[#FFE000] focus:ring-0 focus:outline-none bg-black border-white/20 accent-[#FFE000]"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">Mark as Primary Contact Number</span>
                    <span className="text-[11px] text-zinc-400 block">
                      Used for quick actions like Call Now buttons across headers and heroes.
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer border-t border-white/5 pt-2">
                  <input
                    type="checkbox"
                    checked={phoneFormData.isActive}
                    onChange={(e) => setPhoneFormData({ ...phoneFormData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-[#6CD34A] focus:ring-0 focus:outline-none bg-black border-white/20 accent-[#6CD34A]"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">Active / Published</span>
                    <span className="text-[11px] text-zinc-400 block">
                      When checked, this number is visible on the live public Contact page.
                    </span>
                  </div>
                </label>
              </div>

              {/* Form Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setPhoneModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6CD34A] hover:bg-[#58b738] text-black text-xs font-bold uppercase tracking-wider transition-colors shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingPhone ? 'Update Number' : 'Save Number'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: ADD / EDIT EMAIL ADDRESS
      ======================================================== */}
      {emailModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-white/15 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#6CD34A]/20 text-[#6CD34A] flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white uppercase tracking-wide">
                  {editingEmail ? 'Edit Email Address' : 'Add Email Address'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEmailModalOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEmail} className="p-5 space-y-4">
              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  placeholder="e.g. info@ggemssports.com"
                  value={emailFormData.email}
                  onChange={(e) => setEmailFormData({ ...emailFormData, email: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-black border text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#6CD34A] ${
                    emailErrors.email ? 'border-red-500' : 'border-white/10'
                  }`}
                />
                {emailErrors.email && (
                  <p className="text-[11px] text-red-400 mt-1">{emailErrors.email}</p>
                )}
              </div>

              {/* Role / Label */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Role / Label <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. General Enquiries, Admissions, School Partnerships"
                  value={emailFormData.role}
                  onChange={(e) => setEmailFormData({ ...emailFormData, role: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-black border text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#6CD34A] ${
                    emailErrors.role ? 'border-red-500' : 'border-white/10'
                  }`}
                />
                {emailErrors.role && (
                  <p className="text-[11px] text-red-400 mt-1">{emailErrors.role}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Description / Timing (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. We reply within 24 hours"
                  value={emailFormData.description}
                  onChange={(e) => setEmailFormData({ ...emailFormData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#6CD34A]"
                />
                {emailErrors.description && (
                  <p className="text-[11px] text-red-400 mt-1">{emailErrors.description}</p>
                )}
              </div>

              {/* Display Order */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  min={0}
                  value={emailFormData.displayOrder}
                  onChange={(e) => setEmailFormData({ ...emailFormData, displayOrder: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-[#6CD34A]"
                />
              </div>

              {/* Checkboxes: Primary & Active */}
              <div className="pt-2 flex flex-col gap-2.5 bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailFormData.isPrimary}
                    onChange={(e) => setEmailFormData({ ...emailFormData, isPrimary: e.target.checked })}
                    className="w-4 h-4 rounded text-[#FFE000] focus:ring-0 focus:outline-none bg-black border-white/20 accent-[#FFE000]"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">Mark as Primary Email Address</span>
                    <span className="text-[11px] text-zinc-400 block">
                      Used as default contact address for communication links.
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer border-t border-white/5 pt-2">
                  <input
                    type="checkbox"
                    checked={emailFormData.isActive}
                    onChange={(e) => setEmailFormData({ ...emailFormData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-[#6CD34A] focus:ring-0 focus:outline-none bg-black border-white/20 accent-[#6CD34A]"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">Active / Published</span>
                    <span className="text-[11px] text-zinc-400 block">
                      When checked, this email is visible on the live public Contact page.
                    </span>
                  </div>
                </label>
              </div>

              {/* Form Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEmailModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6CD34A] hover:bg-[#58b738] text-black text-xs font-bold uppercase tracking-wider transition-colors shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingEmail ? 'Update Email' : 'Save Email'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: ADD / EDIT ADDRESS
      ======================================================== */}
      {addressModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-white/15 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#121212] z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#6CD34A]/20 text-[#6CD34A] flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white uppercase tracking-wide">
                  {editingAddress ? 'Edit Address' : 'Add Office Address'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setAddressModalOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="p-5 space-y-4">
              {/* Label */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Location Label <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Head Office / Academy Headquarters"
                  value={addressFormData.label}
                  onChange={(e) => setAddressFormData({ ...addressFormData, label: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-black border text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#6CD34A] ${
                    addressErrors.label ? 'border-red-500' : 'border-white/10'
                  }`}
                />
                {addressErrors.label && (
                  <p className="text-[11px] text-red-400 mt-1">{addressErrors.label}</p>
                )}
              </div>

              {/* Address Line 1 */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Address Line 1 <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Jaypee Wish Town, Kosmos-62, Sector 134"
                  value={addressFormData.addressLine1}
                  onChange={(e) => setAddressFormData({ ...addressFormData, addressLine1: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-black border text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#6CD34A] ${
                    addressErrors.addressLine1 ? 'border-red-500' : 'border-white/10'
                  }`}
                />
                {addressErrors.addressLine1 && (
                  <p className="text-[11px] text-red-400 mt-1">{addressErrors.addressLine1}</p>
                )}
              </div>

              {/* Address Line 2 */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Near Jaypee Hospital"
                  value={addressFormData.addressLine2}
                  onChange={(e) => setAddressFormData({ ...addressFormData, addressLine2: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#6CD34A]"
                />
              </div>

              {/* City, State, Pincode in 3 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    City <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Noida"
                    value={addressFormData.city}
                    onChange={(e) => setAddressFormData({ ...addressFormData, city: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-black border text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#6CD34A] ${
                      addressErrors.city ? 'border-red-500' : 'border-white/10'
                    }`}
                  />
                  {addressErrors.city && (
                    <p className="text-[11px] text-red-400 mt-1">{addressErrors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    State <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Uttar Pradesh"
                    value={addressFormData.state}
                    onChange={(e) => setAddressFormData({ ...addressFormData, state: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-black border text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#6CD34A] ${
                      addressErrors.state ? 'border-red-500' : 'border-white/10'
                    }`}
                  />
                  {addressErrors.state && (
                    <p className="text-[11px] text-red-400 mt-1">{addressErrors.state}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 201304"
                    value={addressFormData.pincode}
                    onChange={(e) => setAddressFormData({ ...addressFormData, pincode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#6CD34A]"
                  />
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  value={addressFormData.country}
                  onChange={(e) => setAddressFormData({ ...addressFormData, country: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-[#6CD34A]"
                />
              </div>

              {/* Google Maps URL */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Google Maps URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://maps.google.com/..."
                  value={addressFormData.mapUrl}
                  onChange={(e) => setAddressFormData({ ...addressFormData, mapUrl: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-black border text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#6CD34A] ${
                    addressErrors.mapUrl ? 'border-red-500' : 'border-white/10'
                  }`}
                />
                {addressErrors.mapUrl && (
                  <p className="text-[11px] text-red-400 mt-1">{addressErrors.mapUrl}</p>
                )}
              </div>

              {/* Directions URL */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Directions URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://www.google.com/maps/dir/..."
                  value={addressFormData.directionsUrl}
                  onChange={(e) => setAddressFormData({ ...addressFormData, directionsUrl: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-black border text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#6CD34A] ${
                    addressErrors.directionsUrl ? 'border-red-500' : 'border-white/10'
                  }`}
                />
                {addressErrors.directionsUrl && (
                  <p className="text-[11px] text-red-400 mt-1">{addressErrors.directionsUrl}</p>
                )}
              </div>

              {/* Display Order */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  min={0}
                  value={addressFormData.displayOrder}
                  onChange={(e) => setAddressFormData({ ...addressFormData, displayOrder: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-[#6CD34A]"
                />
              </div>

              {/* Checkboxes: Primary & Active */}
              <div className="pt-2 flex flex-col gap-2.5 bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addressFormData.isPrimary}
                    onChange={(e) => setAddressFormData({ ...addressFormData, isPrimary: e.target.checked })}
                    className="w-4 h-4 rounded text-[#FFE000] focus:ring-0 focus:outline-none bg-black border-white/20 accent-[#FFE000]"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">Mark as Primary Address</span>
                    <span className="text-[11px] text-zinc-400 block">
                      Displayed as the main office in the hero and contact location cards.
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer border-t border-white/5 pt-2">
                  <input
                    type="checkbox"
                    checked={addressFormData.isActive}
                    onChange={(e) => setAddressFormData({ ...addressFormData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-[#6CD34A] focus:ring-0 focus:outline-none bg-black border-white/20 accent-[#6CD34A]"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">Active / Published</span>
                    <span className="text-[11px] text-zinc-400 block">
                      When checked, this address is visible on the live public Contact page.
                    </span>
                  </div>
                </label>
              </div>

              {/* Form Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setAddressModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6CD34A] hover:bg-[#58b738] text-black text-xs font-bold uppercase tracking-wider transition-colors shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingAddress ? 'Update Address' : 'Save Address'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          DELETE CONFIRMATION MODAL (WITH DELETE PROTECTION)
      ======================================================== */}
      {deleteModal.open && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-white/15 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    deleteModal.isLastActive ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {deleteModal.isLastActive ? <ShieldAlert className="w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
                </div>
                <h3 className="text-base font-bold text-white uppercase tracking-wide">
                  {deleteModal.isLastActive ? 'Delete Blocked' : 'Confirm Deletion'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDeleteModal((prev) => ({ ...prev, open: false }))}
                className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3">
              {deleteModal.isLastActive ? (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs leading-relaxed">
                  <p className="font-bold mb-1">Delete Protection Activated:</p>
                  You cannot delete <span className="font-semibold text-white">&quot;{deleteModal.label}&quot;</span> because it is the only active contact method for this category. The system requires at least one active contact method.
                </div>
              ) : (
                <>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Are you sure you want to permanently delete{' '}
                    <span className="font-bold text-white">&quot;{deleteModal.label}&quot;</span>?
                  </p>
                  {deleteModal.isPrimary && (
                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-200 text-xs flex items-start gap-2">
                      <Info className="w-4 h-4 shrink-0 text-blue-400 mt-0.5" />
                      <span>
                        This is currently marked as <strong className="text-white">Primary</strong>. Deleting it will automatically designate the next active contact method as Primary.
                      </span>
                    </div>
                  )}
                  <p className="text-[11px] text-zinc-500">This action cannot be undone.</p>
                </>
              )}
            </div>

            <div className="p-4 bg-white/[0.02] border-t border-white/10 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteModal((prev) => ({ ...prev, open: false }))}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                {deleteModal.isLastActive ? 'Close' : 'Cancel'}
              </button>
              {!deleteModal.isLastActive && (
                <button
                  type="button"
                  disabled={isPending}
                  onClick={handleConfirmDelete}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Delete Permanently</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
