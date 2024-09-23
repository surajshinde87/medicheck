import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.png'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Rajesh Kumar',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Rajesh Kumar has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 350, // ₹350
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, Mumbai'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Anjali Mehta',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Anjali Mehta has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 450, // ₹450
        address: {
            line1: '27th Cross, Andheri West',
            line2: 'Link Road, Mumbai'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Rakesh Sharma',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Year',
        about: 'Dr. Rakesh Sharma is focused on delivering quality skin care treatments using the latest dermatological practices.',
        fees: 300, // ₹300
        address: {
            line1: '37th Cross, Dadar',
            line2: 'West Mumbai'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Vikram Patel',
        image: doc4,
        speciality: 'Pediatrician',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Vikram Patel is dedicated to providing specialized care for children, ensuring healthy growth and development.',
        fees: 400, // ₹400
        address: {
            line1: '47th Cross, Bandra',
            line2: 'East, Mumbai'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Priya Deshmukh',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Priya Deshmukh is an expert in treating neurological disorders with a focus on patient-centered care.',
        fees: 500, // ₹500
        address: {
            line1: '57th Cross, Chembur',
            line2: 'East, Mumbai'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Shubham Pandey',
        image: doc6,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. Shubham Pandey is dedicated to providing comprehensive healthcare solutions, emphasizing preventive medicine and patient education.',
        fees: 350, // ₹350
        address: {
            line1: '65th Cross, Colaba',
            line2: 'South Mumbai'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Arun Verma',
        image: doc7,
        speciality: 'Gynecologist',
        degree: 'MBBS, MD (Cardiology)',
        experience: '7 Years',
        about: 'Dr. Arun Verma specializing in obstetrics and gynecological surgeries.',
        fees: 500, // ₹500
        address: {
            line1: '78th Cross, Worli',
            line2: 'Mumbai'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Nikhil Gupta',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS, MS (Obstetrics and Gynecology)',
        experience: '6 Years',
        about: 'Dr. Nikhil Gupta has expertise in women’s health, specializing in obstetrics and gynecological surgeries.',
        fees: 400, // ₹400
        address: {
            line1: '32nd Cross, Juhu',
            line2: 'Mumbai'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Sneha Bhattacharya',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS, MD (Dermatology)',
        experience: '3 Years',
        about: 'Dr. Sneha Bhattacharya offers advanced skincare treatments, including laser therapies and cosmetic dermatology.',
        fees: 300, // ₹300
        address: {
            line1: '44th Cross, Borivali',
            line2: 'Mumbai'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Siddharth Menon',
        image: doc10,
        speciality: 'Pediatrician',
        degree: 'MBBS, MD (Pediatrics)',
        experience: '4 Years',
        about: 'Dr. Siddharth Menon is passionate about pediatric care, with a focus on child nutrition and development.',
        fees: 350, // ₹350
        address: {
            line1: '55th Cross, Mulund',
            line2: 'Mumbai'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Pooja Nair',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS, MD (Neurology)',
        experience: '5 Years',
        about: 'Dr. Pooja Nair specializes in neurological disorders, offering treatments for conditions like epilepsy, stroke, and more.',
        fees: 450, // ₹450
        address: {
            line1: '66th Cross, Powai',
            line2: 'Mumbai'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Ankit Yadav',
        image: doc12,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, MS (Orthopedics)',
        experience: '8 Years',
        about: 'Dr. Ankit Yadav specializes in Gastroenterologist, focusing on joint replacements and sports injuries.',
        fees: 500, // ₹500
        address: {
            line1: '77th Cross, Malad',
            line2: 'Mumbai'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Kavita Joshi ',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Kavita Joshi provides comprehensive medical care with an emphasis on preventive health.',
        fees: 300, // ₹300
        address: {
            line1: '88th Cross, Goregaon',
            line2: 'Mumbai'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Rohit Sharma',
        image: doc14,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, MD (Endocrinology)',
        experience: '6 Years',
        about: 'Dr. Rohit Sharma specializes in treating hormonal imbalances and managing diabetes and thyroid disorders.',
        fees: 400, // ₹400
        address: {
            line1: '99th Cross, Marine Lines',
            line2: 'Mumbai'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Ritu Sharma',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS, MD (Psychiatry)',
        experience: '7 Years',
        about: 'Dr. Ritu Sharma offers advanced skincare treatments, including laser therapies and cosmetic dermatology.',
        fees: 450, // ₹450
        address: {
            line1: '110th Cross, Santacruz',
            line2: 'Mumbai'
        }
    }
];
