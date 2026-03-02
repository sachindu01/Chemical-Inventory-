import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px] object-cover"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
          The Faculty of Science University of Peradeniya is one of the leading science faculties in the Sri Lankan university system. The Faculty takes pride in its remarkable contribution bestowed towards national development by promoting education and research in basic and applied sciences.
          </p>
          <p>
          Faculty admits around 500 undergraduate students annually and offers several Honours Study Programmes; B.Sc. Honours study programmes in Biology, Biomedical Sciences, Botany, Chemistry, Computer Science, Data Science, Environmental Science, Geology, Mathematics, Microbiology, Molecular Biology & Biotechnology, Physics, Statistics, Zoology, and in Statistics and Operational Research. The Faculty also offers a B.Sc. study programme in Applied Sciences giving the students an option to exit with a B.Sc. Degree at the end on the third year.
          </p>
          <b className="text-gray-600">Our Mission</b>
          <p>
          To inculcate scientific literacy, quantitative proficiency, as well as moral and ethical values in students through outcome-based learning within a conducive environment to promote excellence in innovative research and outreach activities that inspire solutions to societal and environmental challenges
          </p>
        </div>
      </div>

      <div className="text-center my-10">
      </div>
    </div>
  );
};

export default About;
