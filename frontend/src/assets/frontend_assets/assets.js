import r1 from './r1.png'
import l1 from './l1.png'
import ic1 from './ic1.png'
import w1 from './w1.png'
import w2 from './w2.png'

import EQ1140 from './EQ1140.png'
import EQ1143 from './EQ1143.png'
import EQ1144 from './EQ1144.png'

import MSA from './MSA.png'
import SSA from './SSA.png'
import ASA from './ASA.png'
import ASB from './ASB.png'

import CM51 from './CM51.png'
import rpie from './rpie.png'


import logo from './logo.png'
import hero_img from './hero_img.png'
import cart_icon from './cart_icon.png'
import bin_icon from './bin_icon.png'
import dropdown_icon from './dropdown_icon.png'
import exchange_icon from './exchange_icon.png'
import profile_icon from './profile_icon.png'
import quality_icon from './quality_icon.png'
import search_icon from './search_icon.png'
import star_dull_icon from './star_dull_icon.png'
import star_icon from './star_icon.png'
import support_img from './support_img.png'
import menu_icon from './menu_icon.png'
import about_img from './about_img.png'
import contact_img from './contact_img.png'
import razorpay_logo from './razorpay_logo.png'
import stripe_logo from './stripe_logo.png'
import cross_icon from './cross_icon.png'
import uni_logo from './uni_logo.png'
import uni_logo1 from './uni_logo1.png'
import fund_icon from './fund.png'
import inventory_icon from './inventory.png'
import parcel_icon from './parcel_icon.svg'
import chemical_icon from './chemical_icon.png'

export const assets = {
    logo,
    hero_img,
    cart_icon,
    dropdown_icon,
    exchange_icon,
    profile_icon,
    quality_icon,
    search_icon,
    star_dull_icon,
    star_icon,
    bin_icon,
    support_img,
    menu_icon,
    about_img,
    contact_img,
    razorpay_logo,
    stripe_logo,
    cross_icon,
    uni_logo,uni_logo1,
    fund_icon,
    inventory_icon,
    parcel_icon,
    chemical_icon
}

export const requests = [
    {
      _id: "req1",
      items: [
        {
          name: "IC Bases",
          quantity: 2,
          size: "10pin",
          color: null,
        },
        {
          name: "LEDs",
          quantity: 6,
          size: null,
          color: "Red",
        },
      ],
      address: {
        firstName: "John",
        lastName: "Doe",
        phone: "081-4387222",
      },
      date: 1716634345448, // Example timestamp
      status: "Accepted", // Add status for select dropdown
    },
    {
      _id: "req2",
      items: [
        {
          name: "Resistors",
          quantity: 10,
          size: null,
          color: null,
        },
        {
          name: "Wires",
          quantity: 5,
          size: "5m",
          color: "Black",
        },
      ],
      address: {
        firstName: "Jane",
        lastName: "Smith",
        phone: "071-4547987",
      },
      date: 1716634345450,
      status: "Declined",
    },
    {
      _id: "req2",
      items: [
        {
          name: "Resistors",
          quantity: 10,
          size: null,
          color: null,
        },
        {
          name: "Wires",
          quantity: 5,
          size: "5m",
          color: "Black",
        },
      ],
      address: {
        firstName: "Jane",
        lastName: "Smith",
        phone: "071-4547987",
      },
      date: 1716634345450,
      status: "Pending",
    },
  ];

export const products = [
    
    {
        _id: "aaaaa",
        name: "IC Bases",
        description: "Form Factor: DIP - 0.1, Price	: Rs. 8.00",
        quantity: 100,
        image: [ic1],
        category: "Consumables",
        subCategory: "IC Bases",
        sizes: ["10pin", "12pin", "14pin"],
        date: 1716634345448,
        available: true
    },
    {
        _id: "aaaab",
        name: "LEDs",
        description: "Datasheet URL	: [Not Available], Price	: Rs. 2.00",
        quantity: 200,
        image: [l1],
        category: "Consumables",
        subCategory: "LEDs",
        colors: ["Red", "Yellow", "Green", "IR", "Blue"],
        date: 1716621345448,
        available: true
    },
    {
        _id: "aaaac",
        name: "Resistors",
        description: "Resistor used to control the current flow",
        quantity: 220,
        image: [r1],
        category: "Consumables",
        subCategory: "Resistors",
        sizes: ["220", "480", "1K", "1.5k","2k" ],
        date: 1716234545448,
        available: true
    },
    {
        _id: "aaaad",
        name: "Circuit Wires",
        description: "Datasheet URL	: [Not Available],Price	: Rs. 15.00",
        quantity: 110,
        image: [w1],
        category: "Consumables",
        subCategory: "Wires",
        colors: ["Red", "Black", "White","Orange"],
        date: 1716621345448,
        available: true
    },
    {
        _id: "aaaae",
        name: "Single-core wires",
        description: "Datasheet URL	: [Not Available],Price	: Rs. 10.00",
        quantity: 130,
        image: [w2],
        category: "Consumables",
        subCategory: "Wires",
        sizes: ["Red", "Black", "Yellow"],
        date: 1716622345448,
        available: true
    },
    {
        _id: "aaaaf",
        name: "Impact Drill",
        description: "Input power: 650W, No-load speed: 0-2700rpm, Max. drilling capacity: 13mm, Variable speed control, Forward/Reverse switch, Hammer function",
        quantity: 140,
        image: [EQ1140],
        category: "Equipment",
        subCategory: "Drills",
        date: 1716623423448,
        available: true
    },
    {
        _id: "aaaag",
        name: "Mini Grinder",
        description: "No-load speed:10000-32000,rpm Collet size:3.2mm,Variable speed control,With 1pcs flexible shaft,With 52pcs accessories",
        quantity: 5,
        image: [EQ1143],
        category: "Equipment",
        subCategory: "Grinders",
        sizes: ["S", "L", "XL"],
        date: 1716621542448,
        available: false
    },
    {
        _id: "aaaah",
        name: "Heat Gun",
        description: "Temperature 50°C, 50-630°C, 50-630°C, Airflow 200-500 L/min, 200-500 L/min, 500 L/min, Adjustable temperature with LCD display for precise control, With 1 pcs scraper and 4 pcs nozzles, With 1 pcs 60mm putty trowel",
        quantity: 3,
        image: [EQ1144],
        category: "Equipment",
        subCategory: "Grinders",
        sizes: ["S", "M", "L", "XL"],
        date: 1716622345448,
        available: false
    },
    {
        _id: "aaaai",
        name: "Assembly Station A",
        description: "Capacity	: 1-3 students per table",
        quantity: 1,
        image: [ASA],
        category: "Stations",
        subCategory: "Assembly",
        sizes: ["M", "L", "XL"],
        date: 1716621235448,
        available: false
    },
    {
        _id: "aaaaj",
        name: "Measuring Station A",
        description: "Capacity	: 1-3 students per table",
        quantity: 1,
        image: [MSA],
        category: "Stations",
        subCategory: "Measuring",
        sizes: ["S", "L", "XL"],
        date: 1716622235448,
        available: false
    },
    {
        _id: "aaaak",
        name: "Soldering station A",
        description: "Capacity	: 1-3 students per table",
        quantity: 1,
        image: [SSA],
        category: "Stations",
        subCategory: "Soldering",
        sizes: ["S", "M", "L"],
        date: 1716623345448,
        available: false
    },
    {
        _id: "aaaal",
        name: "Assembly Station B",
        description: "Capacity	: 1-3 students per table",
        quantity: 1,
        image: [ASB],
        category: "Stations",
        subCategory: "Assembly",
        date: 1716622235448,
        available: false
    },
    
    {
        _id: "aaaam",
        name: "Arduino Shield",
        description: "boards that can be plugged on top of the Arduino PCB extending its capabilities",
        quantity: 5,
        image: [CM51],
        category: "Components",
        subCategory: "Arduino",
        sizes: ["Ethernet", "Xbee", "Proto"],
        date: 1716624445448,
        available: false
    },

    {
        _id: "aaaan",
        name: "Raspberry Pi",
        description: "Raspberry Pi 5 8GB RAM, SBC, Raspberry Pi5 8GB, BCM2712, Arm Cortex-A76, 8GB RAM, MicroSD, WiFi, HDMI, Power Button",
        quantity: 2,
        image: [rpie],
        category: "Components",
        subCategory: "Raspberry",
        sizes: ["Ethernet", "Xbee", "Proto"],
        date: 1716624445448,
        available: false
    }
    
   
]