import logo from './logo.png'
import add_icon from './add_icon.png'
import order_icon from './order_icon.png'
import upload_area from './upload_area.png'
import parcel_icon from './parcel_icon.svg'
import bin_icon from './bin_icon.png'
import uni_logo from './uni_logo.png'
import profile_icon from './profile_icon.png'
import fund_icon from './fund.png'
import inventory_icon from './exchange_icon.png'
import search_icon from './search_icon.png'
import chemical_icon from './chemical_icon.png'

export const assets = {
    logo,
    add_icon,
    order_icon,
    upload_area,
    parcel_icon,
    bin_icon,
    uni_logo,
    profile_icon,
    fund_icon,
    inventory_icon,
    search_icon,
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
  