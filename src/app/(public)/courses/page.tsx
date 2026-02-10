
import Link from 'next/link';
// Courses page displaying all available courses at the institute
export default function CoursesPage() {
  // Sample courses data - can be fetched from database
  const courses = [
    {
      id: 1,
      title: "3 Months program",
      description: "",
      duration: "3 Months",
      level: "Beginner to Advanced",
      price: " Contact Administrator",
      topics: ["Computer Appreciation / Typing","Ms – Windows","Programming (Introduction to HTML)","Ms – Word","Ms – Excel","Ms – Power Point","Corel Draw","Internet", "E- mail", "Browsing & Basic Networking"]
    },
    {
      id: 2,
      title: "2 Months Executive program",
      description: "Morning & Afternoon",
      duration: "2 Months",
      level: "Beginner to Advanced",
      price: "Contact Administrator",
      topics: ["Computer Appreciation / Typing","Windows","Programming (Introduction to HTML)","MS – Word","MS – Excel","Ms-Access","MS – Power Point","Corel Draw","Publisher","Internet", "E- mail","Browsing & Basic Networking"]
    },
    {
      id: 3,
      title: "3 Months Graphics Package ",
      description: "Create stunning visual content with Graphics Package,and design principles",
      duration: "3 Months ",
      level: "Beginner to Advanced",
      price: "Contact Administrator",
      topics: ["Corel Draw", "Color separation","Canva", "PicsArt colour", "Adobe Illustrator","Photo Paint", "Adobe Photoshop"]
    },
    {
      id: 4,
      title: "4 Months program",
      description: "Become perfect with computer softwares & office applications",
      duration: "4 Months",
      level: "Beginner to Advanced",
      price: " Contact Administrator",
      topics: ["Computer Appreciation / Typing","Ms – Windows","Programming (Introduction to HTML)","Ms – Word","Ms – Excel","Ms – Power Point","Corel Draw","Internet", "E- mail", "Browsing","Basic Networking"]
    },
    {
      id: 5,
      title: "2 Months program",
      description: "Master Computer Operations and Office Applications",
      duration: "2 Months",
      level: "Beginner to Advanced",
      price: "Contact Administrator",
      topics: ["Computer Appreciation","Ms – Windows","Programming (Introduction to HTML)","Ms – Word","Power Point","Excel"]
    },
    {
      id: 6,
      title: "6 Months program ",
      description: "Become Perfect in Computer Operations & Use of Office Programmes",
      duration: "6 Months",
      level: "Beginner to Advanced",
      price: " Contact Administrator ",
      topics: ["Computer Appreciation / Typing","Ms – Windows","Programming (Introduction to HTML)","Ms – Word","Ms – Excel","Ms – Power Point","Corel Draw","Internet", "E- mail", "Browsing","Basic Networking"]
    },
      {
      id: 7,
      title: "3-4 Months Executive program ",
      description: "3 months Executive morning, afternoon and Evening, 4 months morning and afternoon Program",
      duration: "3-4 Months",
      level: "Beginner to Advanced",
      price: " Contact Administrator  ",
      topics: ["Computer Appreciation / Typing","Ms – Windows","Programming (Introduction to HTML)","Ms – Word","Ms – Excel","Ms – Power Point","Corel Draw","Internet", "E- mail", "Browsing","Basic Networking", "Photoshop","Canva", "PicsArt colour","Photo Paint", "Page Maker","Instant Artist","Print Artist","Typing Tutor","Adobe Illustrator","Introduction to CODING"]
    },
     {
      id: 8,
      title: "Morning, Afternoon and Evening sections",
      description: "Executive 2 months, General 3 months",
      duration: "2-3 Months",
      level: "Beginner to Advanced",
      price: " Contact Administrator ",
      topics: ["Computer Appreciation / Typing","Ms – Windows","Programming (Introduction to HTML)","Ms – Word","Ms – Excel","Ms – Power Point","Ms - Publisher","Corel Draw","Ms-Access","Internet", "E- mail", "Browsing","Basic Networking", "PicsArt colour","Photo Paint", "Page Maker","Instant Artist","Introduction to CODING"]
    },
     {
      id: 9,
      title: "3 Months program",
      description: "Mastering Computer Operations",
      duration: "3 Months",
      level: "Beginner to Advanced",
      price: " Contact Administrator  ",
      topics: ["Computer Appreciation / Typing","Ms – Windows","Programming (Introduction to HTML)","Ms – Word","Ms – Power Point OR Ms - Excel"]
    }
    ,
     {
      id: 10,
      title: "2 Months program",
      description: "Mastering Computer Operations",
      duration: "2 Months",
      level: "Beginner to Advanced",
      price: " Contact Administrator  ",
      topics: ["Computer Appreciation / Typing","Ms – Windows","Programming (Introduction to HTML)","Ms – Word"]
    }
    ,
     {
      id: 11,
      title: "4 Months program",
      description: "Mastering Computer Operations",
      duration: "4 Months",
      level: "Beginner to Advanced",
      price: " Contact Administrator ",
      topics: ["Computer Appreciation / Typing","Ms – Windows","Programming (Introduction to HTML)","Ms – Word","Ms – Power Point OR Ms - Excel"]
    }
  ];

  const specialCourses = [
    {
      id: 1,
      title: "UI / UX Design",
      description: "",
      duration: "2 Months",
      level: "Special Programme",
      price: " Contact Administrator",
      topics: [""]
    },
    {
      id: 2,
      title: "Website Design ",
      description: "HTML 5, CSS, JavaScript",
      duration: "2 Months",
      level: "Special programme",
      price: " Contact Administrator",
    },
    {
      id: 3,
      title: "Networking ",
      description: "",
      duration: "2 Months",
      level: "Special programme",
      price: "Contact Administrator",
    },
     {
      id: 4,
      title: "Java ",
      description: "",
      duration: "1 Month",
      level: "Special programme",
      price: "Contact Administrator",
    },
     {
      id: 5,
      title: "Cyber Security",
      description: "Mastering Cyber Security",
      duration: "3 Months",
      level: "Special programme",
      price: "Contact Administrator",
    },
       {
      id: 6,
      title: "Adobe Photo Shop",
      description: "Mastering Cyber Security",
      duration: "1 Month",
      level: "Special programme",
      price: "Contact Administrator",
    },
      {
      id: 7,
      title: "Peachtree Accounting Package",
      description: "",
      duration: "1 Month",
      level: "Special programme",
      price: "Contact Administrator",
    },
      {
      id: 8,
      title: "AI with Web Development",
      description: "Mastering AI & Web Development",
      duration: "1 Month",
      level: "Special programme",
      price: "Contact Administrator",
    },
    {
      id: 9,
      title: "AutoCAD",
      description: "Mastering AUTO CAD",
      duration: "1 Month",
      level: "Special programme",
      price: "Contact Administrator",
    },
    {
      id: 10,
      title: "CBT Jamb",
      description: "Mastering Jamb CBT",
      duration: "1 Month",
      level: "Special programme",
      price: "Contact Administrator",
    },
     {
      id: 11,
      title: "Web Development",
      description: "Node.Js, JQuery/React Js (4 months),JavaScript, MongoDB/MySQL",
      duration: "4 Months",
      level: "Special programme",
      price: "Contact Administrator",
    },
      {
      id: 12,
      title: "Mobile App Development",
      description: "Node.Js, Express Js, react Native, Expo and Api Integration",
      duration: "3 Months",
      level: "Special programme",
      price: "Contact Administrator",
    },
      {
      id: 13,
      title: "Microsoft Access",
      description: "",
      duration: "1 Month",
      level: "Special programme",
      price: "Contact Administrator",
    },
    {
      id: 14,
      title: "JavaScript",
      description: "",
      duration: "1 Month",
      level: "Special programme",
      price: "Contact Administrator",
    },
    {
      id: 15,
      title: "Coding",
      description: "",
      duration: "4 Months",
      level: "Special programme",
      price: "Contact Administrator",
    },
    {
      id: 16,
      title: "Audio/Sound Editing",
      description: "",
      duration: "1 Month",
      level: "Special programme",
      price: "Contact Administrator",
    },
      {
      id: 17,
      title: "S P S S",
      description: "Data Analysis",
      duration: "2 Weeks",
      level: "Special programme",
      price: "Contact Administrator",
    },
      {
      id: 18,
      title: "Python",
      description: "Data Analysis",
      duration: "2 Months",
      level: "Special programme",
      price: "Contact Administrator",
    },
    {
      id: 19,
      title: "Excel & Access",
      description: "Data Analysis",
      duration: "1 Month",
      level: "Special programme",
      price: "Contact Administrator",
    },
      {
      id: 20,
      title: "Excel & Power Bi",
      description: "Data Analysis",
      duration: "2 Months",
      level: "Special programme",
      price: "Contact Administrator",
    },
      {
      id: 21,
      title: "Digital Marketing",
      description: "",
      duration: "3 Months",
      level: "Special programme",
      price: "Contact Administrator",
    },
     {
      id: 22,
      title: "Video Editing",
      description: "",
      duration: "1 Month",
      level: "Special programme",
      price: "Contact Administrator",
    },
    {
      id: 23,
      title: "Artificial Intelligence",
      description: "",
      duration: "3 Months",
      level: "Special programme",
      price: "Contact Administrator",
    },
    {
      id: 24,
      title: "Data Science",
      description: "",
      duration: "2 Months",
      level: "Special programme",
      price: "Contact Administrator",
    },
    {
      id: 25,
      title: "ArchiCAD",
      description: "",
      duration: "2 Months",
      level: "Special programme",
      price: "Contact Administrator",
    },
     {
      id: 26,
      title: "Quick Book Accounting",
      description: "",
      duration: "1 Month",
      level: "Special programme",
      price: "Contact Administrator",
    },
    {
      id: 27,
      title: "Python with web + Coding ",
      description: "",
      duration: "2 Months",
      level: "Special programme",
      price: "Contact Administrator",
    },
     {
      id: 28,
      title: "ONE ON ONE SPECIAL EXECUTIVE TRAINING",
      description: "",
      duration: "3 Months",
      level: "Special programme",
      price: "Contact Administrator",
    },
     {
      id: 29,
      title: "Computer Maintenance and Repair",
      description: "",
      duration: "12 Months",
      level: "Special programme",
      price: "Contact Administrator",
    },

     {
      id: 30,
      title: "Computer Maintenance and Repair",
      description: "",
      duration: "6 Months",
      level: "Special programme",
      price: "Contact Administrator",
    },
       {
      id: 31,
      title: "Onlline Training /Home  Classes",
      description: "Executive Classes",
      duration: "",
      level: "Special programm",
      price: "Contact Administrator",
    },
     
  ];

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-primary text-white text-center py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Our Courses</h1>
          <p className="text-xl text-gray-100">Choose from our comprehensive range of Innovative designed courses</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-4 bg-secondary border-b border-primary/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
           
            <button className="px-6 py-2 bg-secondary border border-primary/30 text-gray-300 rounded-lg hover:border-primary transition">
            Duration of program and amount under operations
            </button>
           
           
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-secondary border border-primary/10 rounded-lg overflow-hidden hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition"
              >
                {/* Course Header */}
                <div className="bg-primary/10 p-6 border-b border-primary/20">
                  <h3 className="text-2xl font-bold text-primary mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-400">{course.level}</p>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Duration and Price */}
                  <div className="flex justify-between items-center mb-6 pb-6 border-b border-primary/10">
                    <div>
                      <p className="text-sm text-gray-400">Duration</p>
                      <p className="text-lg font-semibold text-foreground">{course.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Price</p>
                      <p className="text-2xl font-bold text-primary">{course.price}</p>
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-400 mb-3">Programmes Covered</p>
                    <div className="flex flex-wrap gap-2">
                      {course.topics.map((topic, idx) => (
                        <span
                          key={idx}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Enroll Button */}
                  {/* <button className="w-full bg-primary hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
                    Enroll Now
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      
      {/* Special Programmes */}
      <section className="py-12 px-4 bg-secondary border-b border-primary/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
           
            <button className="px-6 py-2 bg-secondary border border-primary/30 text-emerald-400 rounded-lg hover:border-primary transition">
            <span className="text-2xl">Special Programmes</span>
            </button>
           
           
          </div>
        </div>
      </section>

       <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialCourses.map((course) => (
              <div
                key={course.id}
                className="bg-secondary border border-primary/10 rounded-lg overflow-hidden hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition"
              >
                {/* Course Header */}
                <div className="bg-primary/10 p-6 border-b border-primary/20">
                  <h3 className="text-2xl font-bold text-primary mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-400">{course.level}</p>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Duration and Price */}
                  <div className="flex justify-between items-center mb-6 pb-6 border-b border-primary/10">
                    <div>
                      <p className="text-sm text-gray-400">Duration</p>
                      <p className="text-lg font-semibold text-foreground">{course.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Price</p>
                      <p className="text-2xl font-bold text-primary">{course.price}</p>
                    </div>
                  </div>
       
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



     <section className="py-24 px-6 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left side: Feature grid */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Mapping through feature items */}
                  {[
                    { title: "Requirements before starting ", desc: "1 Passport Photograph, Registration Fee …… 3000  , Plastic ID card …………2000", color: "bg-blue-500" },
                    { title: "Lecture Periods", desc: "Morning -- 8:30am – 11:30am, Afternoon  --- 12pm – 3pm, Evening --- 3:30pm-6pm ", color: "bg-purple-500" },
                    { title: "Flexible Learning", desc: "Weekend Programs is also available.", color: "bg-emerald-500" },
                    { title: "Placement Cell", desc: "100% support until you land your dream job.", color: "bg-amber-500" }
                  ].map((item, idx) => (
                    // Individual feature box
                    <div key={idx} className="p-6 rounded-2xl bg-secondary/50 border border-white/5 hover:bg-secondary transition-colors">
                      {/* Color strip decorator */}
                      <div className={`w-2 h-12 ${item.color} rounded-full mb-6`} />
                      {/* Feature title */}
                      <h4 className="text-lg font-bold mb-2 text-white">{item.title}</h4>
                      {/* Feature description */}
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
                {/* Right side: Highlighted CTA/Trust card */}
                <div className="bg-primary/10 p-12 rounded-3xl border border-primary/20 backdrop-blur-sm relative">
                  {/* Floating rank badge */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary rounded-full flex items-center justify-center rotate-12 shadow-xl animate-bounce">
                    <span className="text-white font-black text-xl">Top Rank</span>
                  </div>
                  {/* Trust card heading */}
                  <h3 className="text-2xl font-extrabold text-white mb-8 leading-tight"> 
                    Prevailing… Solution to your Computer Problems!!
                  </h3> 
                  {/* Trust card description */}
                  <p className="text-gray-300 text-lg mb-8 leading-relaxed"> 
                    Register for our internal computer exam and certificate with
N12000, and our external computer exam conducted by
NABTEB with N25,000. Our 1st Batch of the exam is April/May,
Aug/Sept and Nov/Dec. please comply on time before the exam
month.
                  </p> 
                  {/* Sub-link to methods */}
                  <Link href="/about" className="flex items-center gap-4 text-primary font-bold group">
                    Learn more about our method
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
    

      {/* CTA Section */}
      <section className="py-20 px-4 bg-secondary border-t border-primary/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Start Learning?</h2>
          <p className="text-gray-300 mb-8">
            Join hundreds of students who have transformed their careers with our courses. Register today and get started!
          </p>
          <button className="bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition">
            Register Now
          </button>
        </div>
      </section>
    </main>
  );
}
