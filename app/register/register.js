"use client"

import { useState, useEffect } from 'react';
import styles from './register.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


export default function RegisterForm() {

    const initialFormState = {
        fullName: '',
        mobile: '',
        email: '',
        password: '',
        confirmPassword: '',
        photo: null,
        permanentHouse: '',
        permanentStreet: '',
        permanentArea: '',
        permanentCity: '',
        permanentState: '',
        permanentCountry: '',
        permanentPin: '',
        presentHouse: '',
        presentStreet: '',
        presentArea: '',
        presentCity: '',
        presentState: '',
        presentCountry: '',
        presentPin: '',
        gender: '',
        aadhar: null,
        fatherName: '',
        fatherMobile: '',
        motherName: '',
        motherMobile: '',
        dob: '',
        tob: '',
        pob: '',
        education: '',
        specialization: '',
        profession: '',
        companyName: '',
        income: '',
        commercialAddress: '',
        color: '',
        height: '',
        weight: '',
        disease: '',
        nukh: '',
        aakay: '',
        origin: '',
        jointIncome: '',
        house: '',
        vehicle: '',
        ancestralBusiness: '',
        ancestralBusinessAddress: '',
        ancestralBusinessMobile: '',
        maritalStatus: '',
        familyMembers: '',
        comments: ''
    }

    const router = useRouter();

    const [form, setForm] = useState(initialFormState);

    const [step, setStep] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpTimer, setOtpTimer] = useState(0);
    const [canResendOtp, setCanResendOtp] = useState(false);
    const [otp, setOtp] = useState("");
    const [showOtp, setShowOtp] = useState(false);

    const [otpVerified, setOtpVerified] = useState(false);

    useEffect(() => {
        setError('');
        setSuccess('');
    }, []);


    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
            setError('');
            setSuccess('');
            }, 3000); // 4 seconds

            return () => clearTimeout(timer);
        }
    }, [error, success]);

    useEffect(() => {
        return () => {
            form.photo?.forEach(file => URL.revokeObjectURL(file.preview));
        };
    }, [form.photo]);


    const steps = ['Basic', 'Personal', 'Family'];
    const stepFields = {
        0: ['fullName', 'mobile', 'email', 'password', 'confirmPassword'],
        1: [
            'photo', 'permanentHouse', 'permanentStreet', 'permanentArea', 'permanentCity', 'permanentState', 'permanentCountry', 'permanentPin',
            'presentHouse', 'presentStreet', 'presentArea', 'presentCity', 'presentState', 'presentCountry', 'presentPin',
            'gender', 'aadhar', 'fatherName', 'fatherMobile', 'motherName', 'motherMobile', 'dob', 'tob', 'pob',
            'education', 'specialization', 'profession', 'companyName', 'income', 'commercialAddress', 'color', 'height', 'weight', 'disease'
        ],
        2: [
            'nukh', 'aakay', 'origin', 'jointIncome', 'house', 'vehicle', 'ancestralBusiness', 'ancestralBusinessAddress', 'ancestralBusinessMobile',
            'maritalStatus', 'familyMembers', 'comments'
        ]
    };

    const fieldLabels = {
        fullName: "Full Name",
        mobile: "Mobile Number",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm Password",
        photo: "Photos",
        aadhar: "Aadhar Card",
        permanentHouse: "Permanent House No.",
        permanentStreet: "Permanent Street/Colony",
        permanentArea: "Permanent Area",
        permanentCity: "Permanent City",
        permanentState: "Permanent State",
        permanentCountry: "Permanent Country",
        permanentPin: "Permanent Pin Code",
        presentHouse: "Present House No.",
        presentStreet: "Present Street/Colony",
        presentArea: "Present Area",
        presentCity: "Present City",
        presentState: "Present State",
        presentCountry: "Present Country",
        presentPin: "Present Pin Code",
        fatherName: "Father's Name",
        fatherMobile: "Father's Mobile",
        motherName: "Mother's Name",
        motherMobile: "Mother's Mobile",
        dob: "Date of Birth",
        tob: "Time of Birth",
        pob: "Place of Birth",
        education: "Education",
        specialization: "Specialization",
        profession: "Profession",
        companyName: "Company Name",
        income: "Income",
        commercialAddress: "Commercial Address",
        color: "Color",
        height: "Height",
        weight: "Weight",
        disease: "Disease",
        nukh: "Nukh",
        aakay: "Aakay",
        origin: "Origin",
        jointIncome: "Joint Income",
        house: "House",
        vehicle: "Vehicle",
        ancestralBusiness: "Ancestral Business",
        ancestralBusinessAddress: "Business Address",
        ancestralBusinessMobile: "Business Mobile",
        maritalStatus: "Marital Status",
        familyMembers: "Family Members",
        comments: "Comments"
    };


    function handleChange(e) {
        const { name, value, files, type } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: type === 'file'
                ? (files && files.length > 0
                    ? (name === 'photo'
                        ? [...(prev[name] || []), ...Array.from(files)].slice(0, 5) // Multiple files for photo
                        : files) // Single file for aadhar
                    : prev[name])
                : value
        }));
    }

    function handleRemoveImage(idx) {
        setForm(prev => ({
            ...prev,
            photo: prev.photo.filter((_, i) => i !== idx)
        }));
    }

    function getStepError() {

        const fields = stepFields[step];

        for (const field of fields) {
            const val = form[field];
            const label = fieldLabels[field] || field; // fallback to field name

            // File validations
            if (field === "photo" || field === "aadhar") {
                if (!val || (Array.isArray(val) && val.length === 0)) {
                    return `${label} is required`;
                }
            }

            // Empty string check
            else if (!val || val.toString().trim() === "") {
                return `${label} is required`;
            }

            // Mobile number: 10 digits
            if (field === "mobile" || field === "fatherMobile" || field === "motherMobile" || field === "ancestralBusinessMobile") {
                if (!/^\d{10}$/.test(val.toString().trim())) {
                    return `Invalid ${label}`;
                }
            }

            // Email format check
            if (field === "email" && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val)) {
                return `Invalid ${label}`;
            }

            // Password checks
            if (field === "password") {
                if (val.length < 6) return `${label} must be at least 6 characters long`;
                if (!/[A-Z]/.test(val)) return `${label} must contain at least 1 uppercase letter`;
                if (!/[a-z]/.test(val)) return `${label} must contain at least 1 lowercase letter`;
                if (!/[0-9]/.test(val)) return `${label} must contain at least 1 number`;
                if (!/[!@#$%^&*(),.?":{}|<>]/.test(val)) return `${label} must contain at least 1 special character`;
            }

            // Confirm password match
            if (field === "confirmPassword" && val !== form.password) {
                return "Passwords do not match";
            }
        }

        return ""; // No errors
    }




    async function handleNext(e) {

        e.preventDefault();
        setError('');

        const stepError = getStepError();

        if (stepError) {
            setError(stepError);
            window.scrollTo({ top: 0, behavior: "smooth" }); // 👈 scroll to top on error
            return;
        }

        // OTP logic only if we are in Step 0

        if (step === 0) {

            if (!showOtp) {
                // First time after validating Step 0 fields, request OTP
                try {
                    const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
                    const res = await fetch(`${apiBase}/api/otp/generate`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            mobile: form.mobile,
                            email: form.email
                        }),
                        credentials: 'include'
                    });
                    const data = await res.json();
                    if (!res.ok) throw new Error(data?.error || 'Failed to send OTP');

                    setOtpSent(true);
                    setOtpTimer(120); // 2 minutes
                    setCanResendOtp(false);
                    setShowOtp(true);

                    // Start countdown timer
                    const timer = setInterval(() => {
                        setOtpTimer(prev => {
                            if (prev <= 1) {
                                clearInterval(timer);
                                setCanResendOtp(true);
                                return 0;
                            }
                            return prev - 1;
                        });
                    }, 1000);

                    setSuccess('OTP sent to your email address. Please check and enter the OTP.');
                } catch (err) {
                    setError(err.message || 'Failed to send OTP');
                    return;
                }
                return;
            }

            // OTP entered
            if (!otp.trim()) {
                setError('OTP is required');
                window.scrollTo({ top: 0, behavior: "smooth" }); // 👈 scroll to top on error
                return;
            }

            try {
                const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
                const res = await fetch(`${apiBase}/api/otp/verify`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        mobile: form.mobile,
                        otp: otp
                    }),
                    credentials: 'include'
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data?.error || 'Invalid OTP');
                setOtpVerified(true); // Mark OTP as verified
            } catch (err) {
                setError(err.message || 'OTP verification failed');
                return;
            }
        }

        // move to next step
        if (step < steps.length - 1) {
            setStep(s => s + 1);
            setError('');
            setShowOtp(false);
            setOtp('');
            setOtpSent(false);
            setOtpTimer(0);
            setCanResendOtp(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // Final submission
        try {
            setSubmitting(true);
            const fd = new FormData();
            Object.entries(form).forEach(([key, val]) => {
                if (key === 'photo' && Array.isArray(val)) {
                    val.forEach(f => fd.append('photos', f));
                } else if (key === 'aadhar' && val && val.length) {
                    fd.append('aadhar', val[0]);
                } else if (key !== 'confirmPassword') {
                    fd.append(key, val ?? '');
                }
            });
 
            // Add OTP to form data only if provided
            if (otp && otp.trim()) {
                fd.append('otp', otp.trim());
            }

            const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
            const res = await fetch(`${apiBase}/api/registration/submit`, {
                method: 'POST',
                body: fd,
                credentials: 'include',
                headers: {
                    // Don't set Content-Type for FormData - let browser set it automatically
                }
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || 'Submission failed');
            setSuccess('Registration submitted for approval.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
           
            setTimeout( () => {
                setForm(initialFormState);
                setStep(0);                  // back to step 0
                setOtp("");                  // clear OTP
                setShowOtp(false);           // hide OTP field
                setOtpVerified(false);       // reset OTP verification status
                router.push('/');     
            }, 3000)
        
        }
        catch (err) {
            setError(err.message || 'Something went wrong');
        }
        finally {
            setSubmitting(false);
        }
    }

    function handleBack() {
        if (step > 0) {
            setStep(stp => stp - 1);
            setError('');
            if (step === 1) { // Going back from step 1 to step 0
                setShowOtp(false);
                setOtp('');
                setOtpSent(false);
                setOtpTimer(0);
                setCanResendOtp(false);
                setOtpVerified(false); // Reset OTP verification status
            }
        }
    }

    return (
        <div className={styles.pageBg}>
            <div className={styles.overlay} />
            <div>
                <video autoPlay muted loop playsInline className={styles.video}>
                    <source src="/189020-884234925_large.mp4" type="video/mp4" />
                </video>

                <form className={styles.card} onSubmit={handleNext} noValidate>
                    <div className={styles.header}>
                        <h2 className={styles.title}>Register</h2>
                        {error && <p className={styles.errorStyles}>{error}</p>}
                        {success && <p className={styles.successStyles}>{success}</p>}
                        <div className={styles.steps}>
                            {steps.map((stp, i) => (
                                <div key={stp} className={`${styles.step} ${i === step ? styles.active : ''}`}>
                                    <strong>{stp}</strong>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Step 1: Basic */}
                    {step === 0 && (
                        <>
                            <label className={`${styles.field} ${styles.area}`}>
                                <span>Full Name</span>
                                <input name="fullName" value={form.fullName} onChange={handleChange} required />
                            </label>


                            <label className={styles.field}>
                                <span>Mobile</span>
                                <div style={{ display: "flex", gap: "0" }}>
                                    <input
                                        style={{
                                            maxWidth: "50px",
                                            borderTopRightRadius: 0,
                                            borderBottomRightRadius: 0,
                                            borderRight: "none",
                                        }}
                                        value={"+91"}
                                        disabled
                                    />
                                    <input
                                        name="mobile"
                                        value={form.mobile}
                                        onChange={handleChange}
                                        placeholder="Enter your mobile number"
                                        style={{
                                            borderTopLeftRadius: 0,
                                            borderBottomLeftRadius: 0,
                                        }}
                                    />
                                </div>



                            </label>



                            <label className={styles.field}>
                                <span>Email</span>
                                <input name="email" value={form.email} onChange={handleChange} type="email" required />
                            </label>
                            <label className={styles.field}>
                                <span>Password</span>
                                <input type="password" name="password" value={form.password} onChange={handleChange} minLength={6} placeholder="At least 6 characters" required />
                            </label>
                            <label className={styles.field}>
                                <span>Confirm Password</span>
                                <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
                            </label>


                            {showOtp && (
                                <>
                                    <label className={`${styles.field} ${styles.otpField}`}>
                                        <span>Enter OTP</span>
                                        <input
                                            type="password"
                                            name="otp"
                                            value={otp}
                                            onChange={e => setOtp(e.target.value)}
                                            placeholder="Enter 4-digit OTP"
                                            required
                                            maxLength={4}
                                        />
                                        {otpTimer > 0 && (
                                            <div style={{
                                                fontSize: '13px',
                                                color: '#f03737ff',
                                                marginTop: '4px',
                                                textAlign: 'right'
                                            }}>
                                                Expires in: {Math.floor(otpTimer / 60)}:{(otpTimer % 60).toString().padStart(2, '0')}
                                            </div>
                                        )}
                                    </label>

                                    {canResendOtp && (
                                        <label className={styles.field}>
                                        <button
                                            type="button"
                                            className={styles.ghostBtn}
                                            onClick={async () => {
                                                try {
                                                    const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
                                                    const res = await fetch(`${apiBase}/api/otp/generate`, {
                                                        method: 'POST',
                                                        headers: { 'Content-Type': 'application/json' },
                                                        body: JSON.stringify({
                                                            mobile: form.mobile,
                                                            email: form.email
                                                        }),
                                                        credentials: 'include'
                                                    });
                                                    const data = await res.json();
                                                    if (!res.ok) throw new Error(data?.error || 'Failed to resend OTP');

                                                    setOtpSent(true);
                                                    setOtpTimer(120);
                                                    setCanResendOtp(false);
                                                    setOtp('');

                                                    const timer = setInterval(() => {
                                                        setOtpTimer(prev => {
                                                            if (prev <= 1) {
                                                                clearInterval(timer);
                                                                setCanResendOtp(true);
                                                                return 0;
                                                            }
                                                            return prev - 1;
                                                        });
                                                    }, 1000);

                                                    setSuccess('OTP resent successfully. Please check your email.');
                                                } catch (err) {
                                                    setError(err.message || 'Failed to resend OTP');
                                                }
                                            }}
                                            // style={{ marginTop: '8px', fontSize: '12px' }}
                                        >
                                            Resend OTP
                                        </button>
                                        </label>
                                    )}
                                </>
                            )}
                        </>
                    )}

                    {/* Step 2: Personal */}
                    {step === 1 && (
                        <>
                            <div className={styles.images}>
                                <label className={styles.fieldFull}>
                                    <span>Upload Photos (4-5)</span>
                                    <input
                                        type="file"
                                        name="photo"
                                        onChange={handleChange}
                                        accept="image/*"
                                        multiple
                                        className={styles.fileInput}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            document.querySelector('input[name="photo"]').click()
                                        }
                                        className={styles.uploadBtn}
                                    >
                                        Choose Files
                                    </button>
                                </label>

                                {
                                    form.photo && form.photo.length > 0 && (
                                        <div className={styles.previewGrid}>
                                            {
                                                form.photo.map((file, idx) => (
                                                    <div key={idx} className={styles.previewItem}>
                                                        <Image
                                                            src={URL.createObjectURL(file)}
                                                            alt={`preview-${idx}`}
                                                            className={styles.previewImg}
                                                            width={100} // optional, improves layout
                                                            height={100} // optional

                                                        />
                                                        <button
                                                            type="button"
                                                            className={styles.removeBtn}
                                                            onClick={() => handleRemoveImage(idx)}
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>

                            <fieldset className={styles.group}>
                                <legend>Permanent Address</legend>
                                <div className={styles.addrGrid}>
                                    <input name="permanentHouse" value={form.permanentHouse} placeholder="House No." onChange={handleChange} required />
                                    <input name="permanentStreet" value={form.permanentStreet} placeholder="Street/Colony" onChange={handleChange} required />
                                    <input name="permanentArea" value={form.permanentArea} placeholder="Area" onChange={handleChange} className={styles.area} required />
                                    <input name="permanentCity" value={form.permanentCity} placeholder="City" onChange={handleChange} required />
                                    <input name="permanentState" value={form.permanentState} placeholder="State" onChange={handleChange} required />
                                    <input name="permanentCountry" value={form.permanentCountry} placeholder="Country" onChange={handleChange} required />
                                    <input name="permanentPin" value={form.permanentPin} placeholder="Pin Code" onChange={handleChange} required />
                                </div>
                            </fieldset>

                            <fieldset className={styles.group}>
                                <legend>Present Address</legend>
                                <div className={styles.addrGrid}>
                                    <input name="presentHouse" value={form.presentHouse} placeholder="House No." onChange={handleChange} required />
                                    <input name="presentStreet" value={form.presentStreet} placeholder="Street/Colony" onChange={handleChange} required />
                                    <input name="presentArea" value={form.presentArea} placeholder="Area" onChange={handleChange} className={styles.area} required />
                                    <input name="presentCity" value={form.presentCity} placeholder="City" onChange={handleChange} required />
                                    <input name="presentState" value={form.presentState} placeholder="State" onChange={handleChange} required />
                                    <input name="presentCountry" value={form.presentCountry} placeholder="Country" onChange={handleChange} required />
                                    <input name="presentPin" value={form.presentPin} placeholder="Pin Code" onChange={handleChange} required />
                                </div>
                            </fieldset>

                            <label className={styles.field}>
                                <span>Gender</span>
                                <select name="gender" value={form.gender} onChange={handleChange} required>
                                    <option value="" hidden disabled>Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </label>

                            <label className={styles.field}>
                                <span>Aadhar Card</span>
                                <input
                                    type="file"
                                    name="aadhar"
                                    className={styles.aadharInput}
                                    onChange={handleChange}
                                    accept=".pdf,image/*"
                                    required
                                />
                            </label>

                            <label className={styles.field}>
                                <span>Father&apos;s Name</span>
                                <input name="fatherName" value={form.fatherName} onChange={handleChange} required />
                            </label>


                            <label className={styles.field}>
                                <span>Mobile</span>
                                <div style={{ display: "flex", gap: "0" }}>
                                    <input
                                        style={{
                                            maxWidth: "50px",
                                            borderTopRightRadius: 0,
                                            borderBottomRightRadius: 0,
                                            borderRight: "none",
                                        }}
                                        value={"+91"}
                                        disabled
                                    />
                                    <input
                                        name="fatherMobile"
                                        value={form.fatherMobile}
                                        onChange={handleChange}
                                        placeholder="Enter your father's mobile number"
                                        style={{
                                            borderTopLeftRadius: 0,
                                            borderBottomLeftRadius: 0,
                                        }}
                                    />
                                </div>



                            </label>

                            <label className={styles.field}>
                                <span>Mother&apos;s Name</span>
                                <input name="motherName" value={form.motherName} onChange={handleChange} required />
                            </label>

                            <label className={styles.field}>
                                <span>Mother&apos;s Mobile</span>
                                <div style={{ display: "flex", gap: "0" }}>
                                    <input
                                        style={{
                                            maxWidth: "50px",
                                            borderTopRightRadius: 0,
                                            borderBottomRightRadius: 0,
                                            borderRight: "none",
                                        }}
                                        value={"+91"}
                                        disabled
                                    />
                                    <input
                                        name="motherMobile"
                                        value={form.motherMobile}
                                        onChange={handleChange}
                                        placeholder="Enter your mother's mobile number"
                                        style={{
                                            borderTopLeftRadius: 0,
                                            borderBottomLeftRadius: 0,
                                        }}
                                    />
                                </div>



                            </label>

                            <label className={styles.field}>
                                <span>Date of Birth</span>
                                <input type="date" name="dob" value={form.dob} onChange={handleChange} required />
                            </label>

                            <label className={styles.field}>
                                <span>Time of Birth</span>
                                <input type="time" name="tob" value={form.tob} onChange={handleChange} required />
                            </label>

                            <label className={styles.field}>
                                <span>Place of Birth</span>
                                <input name="pob" value={form.pob} onChange={handleChange} required />
                            </label>

                            <label className={styles.field}>
                                <span>Education</span>
                                <input name="education" value={form.education} onChange={handleChange} required />
                            </label>

                            <label className={styles.field}>
                                <span>Specialization</span>
                                <input name="specialization" value={form.specialization} onChange={handleChange} required />
                            </label>

                            <label className={styles.field}>
                                <span>Profession</span>
                                <input name="profession" value={form.profession} onChange={handleChange} required />
                            </label>

                            <label className={styles.field}>
                                <span>Company Name</span>
                                <input name="companyName" value={form.companyName} onChange={handleChange} required />
                            </label>

                            <label className={styles.field}>
                                <span>Income</span>
                                <input name="income" value={form.income} onChange={handleChange} required />
                            </label>

                            <label className={styles.field}>
                                <span>Commercial Address</span>
                                <input name="commercialAddress" value={form.commercialAddress} onChange={handleChange} required />
                            </label>

                            <label className={styles.field}>
                                <span>Color</span>
                                <input name="color" value={form.color} onChange={handleChange} required />
                            </label>

                            <label className={styles.field}>
                                <span>Height</span>
                                <input name="height" value={form.height} onChange={handleChange} required />
                            </label>

                            <label className={styles.field}>
                                <span>Weight</span>
                                <input name="weight" value={form.weight} onChange={handleChange} required />
                            </label>

                            <label className={`${styles.field} ${styles.area}`}>
                                <span>Disease (if any)</span>
                                <input name="disease" value={form.disease} onChange={handleChange} required />
                            </label>
                        </>
                    )}

                    {/* Step 3: Family */}
                    {step === 2 && (
                        <>
                            <label className={styles.field}>
                                <span>Nukh</span>
                                <input name="nukh" value={form.nukh} onChange={handleChange} required />
                            </label>
                            <label className={styles.field}>
                                <span>Aakay</span>
                                <input name="aakay" value={form.aakay} onChange={handleChange} required />
                            </label>
                            <label className={styles.field}>
                                <span>Origin</span>
                                <select name="origin" value={form.origin} onChange={handleChange} required>
                                    <option value="" hidden disabled>Select origin</option>
                                    <option value="Sindh">Sindh</option>
                                    <option value="Punjab">Punjab</option>
                                    <option value="Balochistan">Balochistan</option>
                                    <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                                </select>
                            </label>
                            <label className={styles.field}>
                                <span>Joint Income (Family)</span>
                                <input name="jointIncome" value={form.jointIncome} onChange={handleChange} required />
                            </label>
                            <label className={styles.field}>
                                <span>House</span>
                                <select name="house" value={form.house} onChange={handleChange} required>
                                    <option value="" hidden disabled>Select</option>
                                    <option value="own">Own</option>
                                    <option value="rent">Rent</option>
                                </select>
                            </label>
                            <label className={styles.field}>
                                <span>Vehicle</span>
                                <input name="vehicle" value={form.vehicle} onChange={handleChange} required />
                            </label>
                            <label className={styles.field}>
                                <span>Ancestral/Professional Business</span>
                                <input name="ancestralBusiness" value={form.ancestralBusiness} onChange={handleChange} required />
                            </label>
                            <label className={styles.field}>
                                <span>Business Address</span>
                                <input name="ancestralBusinessAddress" value={form.ancestralBusinessAddress} onChange={handleChange} required />
                            </label>


                            <label className={styles.field}>
                                <span>Business Mobile Number</span>
                                <div style={{ display: "flex", gap: "0" }}>
                                    <input
                                        style={{
                                            maxWidth: "50px",
                                            borderTopRightRadius: 0,
                                            borderBottomRightRadius: 0,
                                            borderRight: "none",
                                        }}
                                        value={"+91"}
                                        disabled
                                    />
                                    <input
                                        name="ancestralBusinessMobile"
                                        value={form.ancestralBusinessMobile}
                                        onChange={handleChange}
                                        placeholder="Enter your ancestral Business Mobile number"
                                        style={{
                                            borderTopLeftRadius: 0,
                                            borderBottomLeftRadius: 0,
                                        }}
                                    />
                                </div>



                            </label>
                            <label className={styles.field}>
                                <span>Marital Status</span>
                                <select name="maritalStatus" value={form.maritalStatus} onChange={handleChange} required>
                                    <option value="" hidden disabled>Select</option>
                                    <option value="unmarried">Unmarried</option>
                                    <option value="divorced">Divorced</option>
                                    <option value="separated">Relation Separated</option>
                                    <option value="other">Other</option>
                                </select>
                            </label>
                            <label className={styles.field}>
                                <span>Family Members</span>
                                <textarea name="familyMembers" value={form.familyMembers} onChange={handleChange} required></textarea>
                            </label>
                            <label className={styles.field}>
                                <span>Other Comments</span>
                                <textarea name="comments" value={form.comments} onChange={handleChange} required></textarea>
                            </label>
                        </>
                    )}

                    <div className={styles.controls}>

                        {
                            step > 0 && (
                                <button type="button" className={styles.ghostBtn} onClick={handleBack}>
                                    Back
                                </button>
                            )
                        }

                        <button type="submit" className={styles.nextBtn} disabled={submitting || (showOtp && !otp.trim())}>
                            {submitting
                                ? 'Submitting...'
                                : (step === steps.length - 1
                                    ? 'Submit Registration'
                                    : (otpVerified ? 'Next' : (showOtp ? 'Verify OTP' : 'Send OTP'))
                                )
                            }
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}