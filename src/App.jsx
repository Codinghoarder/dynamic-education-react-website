import React, { useState, useEffect, useRef } from 'react';

// --- HELPER & DATA COMPONENTS ---

// This component creates a subtle, animated gradient background.
const AnimatedBackground = () => (
    <div className="fixed inset-0 -z-10 h-full w-full bg-slate-50 dark:bg-slate-950">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
    </div>
);

// Course data, kept from the original structure
const coursesData = {
  java: {
    name: 'Java Full Stack',
    modules: [
      { title: 'Module 1: Core Java', items: ['Getting Started With Java', 'OOPs Concepts', 'Java String & Regex', 'Exception Handling & I/O', 'Multithreading & Collections'] },
      { title: 'Module 2: Advance Java', items: ['Servlets & JSP', 'Session Management', 'JSP Tags & JSTL', 'MVC Design Pattern'] },
      { title: 'Module 3: Spring / Spring Boot', items: ['Spring Core (IoC, DI)', 'Dependency Injection', 'Maven & POM File', 'Spring with JDBC & DAO', 'Spring with JPA (ORM)'] },
      { title: 'Module 4: HTML', items: ['Tags, Elements, Attributes', 'Forms, Tables, Lists', 'Layouts & Style Sheets'] },
      { title: 'Module 5: CSS', items: ['Selectors & Box Model', 'Positioning & Layouts', 'Navigation & Dropdowns'] },
      { title: 'Module 6: SQL', items: ['MySQL Workbench', 'Queries, Clauses & Joins', 'Triggers & Functions'] },
      { title: 'Module 7: JavaScript', items: ['Variables & Operators', 'Loops & Functions', 'Events & Form Validation'] },
      { title: 'Module 8: Bootstrap', items: ['Grid System', 'Components & Plug-Ins'] },
    ]
  },
  python: {
    name: 'Python Full Stack',
    modules: [
        { title: 'Chapter 1: Introduction', items: ['History & Features of Python', 'Environment Setup', 'Identifiers, Keywords, Indentation', 'Data Types & Variables'] },
        { title: 'Chapter 2-3: Data Structures', items: ['Lists, Ranges, Tuples', 'Iterators & Generators', 'Dictionaries & Sets'] },
        { title: 'Chapter 4-5: I/O & Functions', items: ['Reading & Writing Text Files', 'Writing Binary Files (Pickle)', 'User Defined Functions', 'Modules & Packages'] },
        { title: 'Chapter 6: Object Oriented', items: ['OOP Overview', 'Classes & Objects', 'Attributes & Methods'] },
        { title: 'Chapter 7-8: Advanced Topics', items: ['Exception Handling', 'Regular Expressions', 'The match & search Functions'] },
        { title: 'Chapter 9-10: Multithreading & DB', items: ['Introduction to Multithreading', 'Synchronizing Threads', 'MySQL Database Access', 'CRUD Operations'] },
    ]
  },
  dsp: {
    name: 'Diploma in Software Programming',
    modules: [
        { title: 'Module 1 & 2: C/C++', items: ['C: Variables, Data Types, Operators', 'C: Loops, Arrays, Pointers', 'C++: OOPs Concepts, Classes', 'C++: Polymorphism & Exceptions'] },
        { title: 'Module 3 & 4: HTML/CSS', items: ['HTML: Tags, Forms, Tables', 'CSS: Selectors, Box Model', 'CSS: Responsive Design'] },
        { title: 'Module 5 & 6: Python & Java', items: ['Python: Syntax, Data Structures', 'Java: Syntax, Variables, OOPs'] },
        { title: 'Module 7 & 8: C#/.NET & SQL', items: ['C#: Data Types, Loops', 'SQL: Database Handling, Triggers'] },
        { title: 'Module 9-11: Specialization', items: ['Select one specialization (Advance Java, Python, or C#) and one framework (Spring, Django, or .NET Core) to complete your diploma.'] },
    ]
  },
};

// --- SVG Icons ---
const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m4.93 19.07 1.41-1.41"/><path d="m17.66 6.34 1.41-1.41"/></svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
);

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
);

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);


// --- LAYOUT COMPONENTS ---

const Header = ({ currentPage, navigate, theme, toggleTheme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navLinks = ['Home', 'Courses', 'About', 'Register', 'Contact'];

    const NavLink = ({ page, isMobile }) => (
        <a
            href={`#${page.toLowerCase()}`}
            onClick={(e) => { e.preventDefault(); navigate(page); setIsMenuOpen(false); }}
            className={`relative group transition-colors duration-300 ${isMobile ? 'block text-lg py-3 px-4' : 'text-base font-medium py-2'} 
            ${currentPage === page ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'}`}
        >
            {page}
            {!isMobile && (
                <span className={`absolute bottom-0 left-0 block h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 ${currentPage === page ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            )}
        </a>
    );

    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <a href="#home" onClick={(e) => { e.preventDefault(); navigate('Home'); }} className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                        Dynamic<span className="text-blue-600">Education</span>
                    </a>
                    <div className="flex items-center">
                        <nav className="hidden md:flex items-center space-x-8">
                            {navLinks.map(link => <NavLink key={link} page={link} />)}
                        </nav>
                        <div className="flex items-center space-x-2 md:ml-6">
                            <button onClick={toggleTheme} className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Toggle theme">
                                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                            </button>
                            <button className="md:hidden p-2 rounded-md text-slate-600 dark:text-slate-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                {isMenuOpen ? <XIcon /> : <MenuIcon />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-slate-200 dark:border-slate-800">
                    <nav className="flex flex-col py-2">
                        {navLinks.map(link => <NavLink key={link} page={link} isMobile />)}
                    </nav>
                </div>
            )}
        </header>
    );
};

const Footer = () => (
    <footer className="border-t border-slate-200 dark:border-slate-800 mt-auto cursor-pointer">
        <div className="container mx-auto px-4 py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
            <p className="font-semibold text-slate-800 dark:text-white mb-1">Dynamic Computer Education</p>
            <p>Plot No 7, Room No D-5 Mahada, Rd Number 1, Lokhandwala Twp, Kandivali East, Mumbai, 400101.</p>
            <p className="mb-2">+91 7045419484 | www.dcedu.co.in</p>
            <p>&copy; {new Date().getFullYear()} DynamicEducation. All Rights Reserved.</p>
        </div>
    </footer>
);


// --- PAGE COMPONENTS ---

const HomePage = ({ navigate }) => (
    <section id="home" className="flex-grow flex items-center">
        <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 dark:from-blue-400 dark:via-cyan-300 dark:to-blue-500 mb-4 leading-tight cursor-pointer drop-shadow-[0_2px_4px_rgba(59,130,246,0.2)] dark:drop-shadow-[0_2px_4px_rgba(56,189,248,0.2)]">
                Unlock Your Future in Tech
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-8 cursor-pointer">
                Join our industry-leading courses in Java, Python, and Software Programming. Go from beginner to job-ready with expert-led, hands-on training.
            </p>
            <div className="flex justify-center items-center gap-4 flex-wrap">
                <a href="#courses" onClick={(e) => { e.preventDefault(); navigate('Courses'); }} className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300">View Our Courses</a>
                <a href="#register" onClick={(e) => { e.preventDefault(); navigate('Register'); }} className="px-8 py-3 bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-white font-semibold rounded-lg shadow-md hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-300">Register Now</a>
            </div>
        </div>
    </section>
);

const CodeAnimation = () => {
    const codeString = `class DynamicEducation:
    def __init__(self):
        self.motto = "Unlock Your Future in Tech!"

    def greet(self):
        print(self.motto)

student = DynamicEducation()
student.greet()
# Output: Unlock Your Future in Tech!`;

    const [typedCode, setTypedCode] = useState('');
    const typingSpeed = 50; // milliseconds

    useEffect(() => {
        if (typedCode.length < codeString.length) {
            const timeoutId = setTimeout(() => {
                setTypedCode(codeString.substring(0, typedCode.length + 1));
            }, typingSpeed);
            return () => clearTimeout(timeoutId);
        }
    }, [typedCode, codeString]);

    return (
        <div className="bg-slate-900 rounded-2xl shadow-2xl p-6 font-mono text-sm text-slate-300 h-full">
            <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <pre className="whitespace-pre-wrap break-all">
                <code
                    dangerouslySetInnerHTML={{
                        __html: typedCode
                            .replace(/class|def|self|print/g, '<span class="text-purple-400">$&</span>')
                            .replace(/DynamicEducation/g, '<span class="text-sky-400">$&</span>')
                            .replace(/"[^"]*"/g, '<span class="text-green-400">$&</span>')
                             .replace(/#.*/g, '<span class="text-slate-500">$&</span>')
                    }}
                />
                <span className="animate-pulse">|</span>
            </pre>
        </div>
    );
};


const AboutPage = () => (
    <section id="about" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                    <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 dark:from-blue-400 dark:via-cyan-300 dark:to-blue-500 mb-4 cursor-pointer drop-shadow-[0_2px_4px_rgba(59,130,246,0.2)] dark:drop-shadow-[0_2px_4px_rgba(56,189,248,0.2)]">About Us</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 cursor-pointer">Founded on the principle of making tech education accessible and practical, we are dedicated to empowering the next generation of software developers.</p>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {[
                            { title: 'Expert Instructors', text: 'Learn from professionals with years of experience in the software industry.' },
                            { title: 'Hands-On Learning', text: 'Build real-world projects and gain practical skills that employers are looking for.' },
                            { title: 'Career Support', text: 'From resume building to interview prep, we\'re with you every step of the way.' },
                            { title: 'Practical Courses', text: 'Our courses are focused on practical application to ensure you are job-ready.' },
                        ].map(item => (
                           <div key={item.title} className="bg-white/50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer">
                               <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">{item.title}</h3>
                               <p className="text-slate-600 dark:text-slate-400 text-sm">{item.text}</p>
                           </div>
                        ))}
                    </div>
                </div>
                 <div className="order-1 md:order-2">
                    <CodeAnimation />
                </div>
            </div>
        </div>
    </section>
);

const CoursesPage = () => {
    const [activeTab, setActiveTab] = useState('java');
    const activeCourse = coursesData[activeTab];

    return (
        <section id="courses" className="py-16 md:py-24 bg-slate-100/50 dark:bg-slate-900/50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 dark:from-blue-400 dark:via-cyan-300 dark:to-blue-500 mb-12 cursor-pointer drop-shadow-[0_2px_4px_rgba(59,130,246,0.2)] dark:drop-shadow-[0_2px_4px_rgba(56,189,248,0.2)]">Our Core Curriculum</h2>
                <div className="max-w-4xl mx-auto bg-white dark:bg-slate-950/50 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">
                    <div className="flex justify-center border-b border-slate-200 dark:border-slate-800 p-2 flex-wrap">
                        {Object.keys(coursesData).map(key => (
                            <button
                                key={key}
                                className={`px-3 sm:px-4 py-2 m-1 text-xs sm:text-sm font-semibold rounded-lg transition-colors duration-300 ${activeTab === key ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                                onClick={() => setActiveTab(key)}
                            >
                                {coursesData[key].name}
                            </button>
                        ))}
                    </div>
                    <div className="p-4 sm:p-6 md:p-10">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {activeCourse.modules.map((module) => (
                                <div key={module.title} className="p-4 rounded-lg transition-colors duration-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 cursor-pointer">
                                    <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-3">{module.title}</h3>
                                     <ul className="space-y-2">
                                        {module.items.map((item, i) => (
                                            <li key={i} className="flex items-start">
                                                <span className="text-blue-600 mr-2 mt-1">✓</span>
                                                <span className="text-slate-600 dark:text-slate-400 text-sm">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const FormCard = ({ title, subtitle, children }) => (
    <div className="w-full max-w-lg mx-auto bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl">
        <div className="p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 dark:from-blue-400 dark:via-cyan-300 dark:to-blue-500 mb-2 pb-1 drop-shadow-[0_2px_4px_rgba(59,130,246,0.2)] dark:drop-shadow-[0_2px_4px_rgba(56,189,248,0.2)]">{title}</h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-8">{subtitle}</p>
            {children}
        </div>
    </div>
);


const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', course: '' });
    const [errors, setErrors] = useState({ email: '', phone: '' });
    const [status, setStatus] = useState({ message: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const validate = () => {
        let tempErrors = { email: '', phone: '' };
        let isValid = true;
        setStatus({ message: '', type: '' }); // Clear previous status messages

        if (!formData.email || !formData.email.includes('@')) {
            tempErrors.email = 'Please enter a valid email address.';
            isValid = false;
        }

        if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
            tempErrors.phone = 'Phone number must be exactly 10 digits.';
            isValid = false;
        }
        
        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);

        const emailParams = {
            name: formData.name,
            email: formData.email,
            phone: `+91${formData.phone}`,
            course: formData.course || 'Not specified'
        };

        const serviceID = 'service_cax09fq';
        const templateID = 'template_5kenmcg';
        const publicKey = 'I9alwunA6wP9XKXQF';

        window.emailjs.send(serviceID, templateID, emailParams, publicKey)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setIsLoading(false);
                setStatus({ message: 'Registration successful! A confirmation email has been sent.', type: 'success' });
                setFormData({ name: '', email: '', phone: '', course: '' });
                setErrors({ email: '', phone: '' });
            }, (err) => {
                console.log('FAILED...', err);
                setIsLoading(false);
                setStatus({ message: 'Failed to send confirmation email. Please try again.', type: 'error' });
            });
    };
    
    return (
        <section id="register" className="py-16 md:py-24 flex-grow flex items-center">
             <div className="container mx-auto px-4">
                <FormCard title="Register Now" subtitle="Take the first step towards your new career.">
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="space-y-4">
                            <div>
                                <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
                            </div>
                            <div>
                                <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 text-sm text-slate-500 bg-slate-100 border border-r-0 border-slate-300 rounded-l-lg dark:bg-slate-700 dark:text-slate-400 dark:border-slate-600">
                                      +91
                                    </span>
                                    <input name="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" pattern="\d{10}" />
                                </div>
                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                            </div>
                            <select name="course" value={formData.course} onChange={handleChange} required className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all">
                                <option value="" disabled>Choose a course...</option>
                                {Object.values(coursesData).map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                            </select>
                        </div>
                        <button type="submit" disabled={isLoading} className="w-full mt-6 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 disabled:bg-blue-300">
                            {isLoading ? 'Submitting...' : 'Register Now'}
                        </button>
                        {status.message && <p className={`text-center mt-4 ${status.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>{status.message}</p>}
                    </form>
                </FormCard>
             </div>
        </section>
    );
};

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({ email: '' });
    const [status, setStatus] = useState({ message: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const validate = () => {
        let tempErrors = { email: '' };
        let isValid = true;
        setStatus({ message: '', type: '' });

        if (!formData.email || !formData.email.includes('@')) {
            tempErrors.email = 'Please enter a valid email address.';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);

        const emailParams = {
            name: formData.name,
            email: formData.email,
            message: formData.message,
        };
        
        const serviceID = 'service_cax09fq';
        const templateID = 'template_btxyolr';
        const publicKey = 'I9alwunA6wP9XKXQF';
        
        window.emailjs.send(serviceID, templateID, emailParams, publicKey)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setIsLoading(false);
                setStatus({ message: 'Thank you! Your query has been sent and a confirmation email is on its way.', type: 'success' });
                setFormData({ name: '', email: '', message: '' });
                setErrors({ email: '' });
            }, (err) => {
                console.log('FAILED...', err);
                setIsLoading(false);
                setStatus({ message: 'Failed to send email. Please try again later.', type: 'error' });
            });
    };

    return (
        <section id="contact" className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div>
                         <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 dark:from-blue-400 dark:via-cyan-300 dark:to-blue-500 mb-4 cursor-pointer drop-shadow-[0_2px_4px_rgba(59,130,246,0.2)] dark:drop-shadow-[0_2px_4px_rgba(56,189,248,0.2)]">Contact Us</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 cursor-pointer">We have multiple branches across Mumbai. Find the one nearest to you and get in touch!</p>
                         <div className="space-y-6">
                            <div className="bg-white/50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer">
                                <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-1">Regd. Office (Kandivali E)</h3>
                                <p className="text-slate-600 dark:text-slate-400">Lokamanya Soc. No. 1, Akurli Road, Hanuman Nagar.</p>
                            </div>
                            <div className="bg-white/50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer">
                                <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-1">Lokhandwala (Kandivali E)</h3>
                                <p className="text-slate-600 dark:text-slate-400">Plot No. 7, Room No. D-5, Mahada Road No. 1, Lokhandwala.</p>
                            </div>
                         </div>
                    </div>
                     <div>
                        <FormCard title="Ask a Query" subtitle="Have questions? We're here to help!">
                             <form onSubmit={handleSubmit} noValidate>
                                <div className="space-y-4">
                                    <div>
                                        <input name="name" type="text" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
                                    </div>
                                    <div>
                                        <input name="email" type="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>
                                    <textarea name="message" placeholder="Your Question" value={formData.message} onChange={handleChange} required rows="4" className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"></textarea>
                                </div>
                                <button type="submit" disabled={isLoading} className="w-full mt-6 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 disabled:bg-blue-300">
                                    {isLoading ? 'Submitting...' : 'Submit Query'}
                                </button>
                                {status.message && <p className={`text-center mt-4 ${status.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>{status.message}</p>}
                            </form>
                        </FormCard>
                    </div>
                </div>
            </div>
        </section>
    );
};


// --- MAIN APP COMPONENT ---

export default function App() {
    const [currentPage, setCurrentPage] = useState('Home');
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    useEffect(() => {
        // Load EmailJS script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);
    
    const renderPage = () => {
        switch (currentPage) {
            case 'Courses': return <CoursesPage />;
            case 'About': return <AboutPage />;
            case 'Register': return <RegisterPage />;
            case 'Contact': return <ContactPage />;
            case 'Home':
            default:
                return <HomePage navigate={setCurrentPage} />;
        }
    };

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans antialiased">
            <AnimatedBackground />
            <div className="relative z-10 flex flex-col min-h-screen">
                <Header currentPage={currentPage} navigate={setCurrentPage} theme={theme} toggleTheme={toggleTheme} />
                <main className="flex-grow flex flex-col">
                    {renderPage()}
                </main>
                <Footer />
            </div>
        </div>
    );
}

