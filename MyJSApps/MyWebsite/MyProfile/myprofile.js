const projectDetails=[
  {"role":"Lead Consultant", 
  "duration":"2012-07 - 2018-07",
  "responsibilities":
  ["Designed architecture captured and documented non Functional architectural requirements, prepared estimates and provided technical solutions to proposals RFPs.",
  "Provided technical leadership to project team to perform design to deployment related activities including reviews",
  "Mapped processes to holistically examine business flow and identify improvement opportunities",
  "Managed team of 10 personnel focused on implementing solutions,fixing issues and enhancement",
  "Involved in daily discussions with customer to understand the requirement and update status as its on Agile mode",
  "Determined areas for improvement and implemented processes to alleviate problems",
  "Identified business issues through careful collaboration with key stakeholders.",
  "Prioritized projects and project tasks depending upon key milestones and deadline dates",
  "Delivered in-depth training to users for applications, imparting knowledge of best practices for protecting data and minimizing errors",
  "Environment - SAP Portal, Webdynpro, BPM, NWDS, Eclipse,SAP UI5, HTML5,CSS3, Javascript, JSON, Restful,Java, SAP ECC"]},

  {"role":"Lead Consultant", 
   "duration":"2012-01 - 2012-07",
   "responsibilities":["Provided depth of knowledge in specified technological area -BPM and SAP Portal, which includes knowledge of applicable processes, methodologies,standards, products and frameworks.",
          "Designed architecture, captured and documented non-functional (architectural) requirements, prepared estimates and provided technical solutions to proposals (RFPs)",
          "Provided technical leadership to project team to perform design to deployment related activities, provide guidance, perform reviews, prevent and resolve technical issues of SAP Portal Landscape","Involved in design, development of webdynpro components and BPM processes for Vendor",
          "This involves integration of MDM through MDM Java API, Webservices for third party integration like postal code, SAP ECC validation and usage of business rules using BRM",
          "Guided and mentored offshore team understanding the technologies, solving critical go-live issuesManaged team of 10 personnel focused on implementing solutions,fixing issues and enhancement",
          ]},
  {"role":"Technical Lead", 
      "duration":"2009-11 - 2011-12",
      "responsibilities":["Involved in discussions with customer to understand the requirement",
      "Oversaw multiple projects, including targets, milestones and team performance",
      "Guided and mentored offshore team of 12 members in understanding the technologies, solving issues and queries for Material and Product domain",
      "Involved in design, development of web components and BPM processes for Material and Product",
      "Delivered in-depth training to users for BPM modules, imparting knowledge of best practices for protecting data and minimizing errors",
      "Managed team of 8 personnel focused on implementing resolutions and updates",
      "Environment SAP NW7.1, MDM 7.1,ECC 6 , Enterprise Portal, NetWeaver Development Studio, SAP MDM console and Data Manager,Java, MDM API Java"
      ]},    
  {"role":"Technical Lead", 
        "duration":"2009-02 - 2009-10",
        "responsibilities":["Involved in code review, technical specification preparation",
        "Guided and mentored offshore team of 4 members in solving issues and queries",
        "Showcased product features to customers and discussed technical details to overcome objections",
        "Delivered in-depth training to team members, imparting knowledge of best practices for coding styles and minimizing errors",
        "Conducted on-site product demonstrations to highlight features, answered customer questions and redirected concerns toward positive aspects"]},
  {"role":"Technical Lead", 
        "duration":"2008-03 - 2009-01",
        "responsibilities":["Involved in development of java objects which includes changes in functionalities like new backend RFC invocation, screen layout changes",
        "Improved system by adding new features and infrastructure, enhancing end user experience",
        "Managed team of 4 personnel focused on implementing resolutions and updates",
        "Prepared detailed documentation on all objects modified within the business package",
        "Environment- SAPJ2EE Application Server, Java, Struts, JSP, XML,HTML,CSS, Enterprise Portal, NetWeaver Development Studio, Windows XP,SAP R/3"]},
  {"role":"Technical Lead", 
        "duration":"2007-01 - 2008-01",
        "responsibilities":["Involved in development of java objects which includes changes in functionalities like new backend RFC invocation, screen layout changes",
        "Improved system by adding new features and infrastructure, enhancing end user experience",
        "Managed team of 4 personnel focused on implementing resolutions and updates",
        "Prepared detailed documentation on all objects modified within the business package",
        "Environment- SAPJ2EE Application Server, Java, Struts, JSP, XML,HTML,CSS, Enterprise Portal, NetWeaver Development Studio, Windows XP,SAP R/3"]},
   {"role":"Senior Software Engineer", 
        "duration":"2005-01 - 2006-12",
        "responsibilities":["Involved in designing, tasking and estimation of the use cases from the expense and payment module for Concur Expense Service- Case Escalation and OnPremise projects",
            "Environment involves Java, Java Servlets, Apache framework (Velocity, Turbine and Torque), JavaScript, XML, MS-SQLServer, PL/SQL, Tomcat 4.1, IntelliJ, VSS, WinCVS and Windows XP"]},  
   {"role":"Software Engineer", 
            "duration":"2004-04 - 2004-12",
            "responsibilities":["Wrote highly maintainable code, Debugged and troubleshot modules solving technical issues quickly and accurately"]}
];

//console.log(projectDetails[1].responsibilities);

var createProjects = function() 
{
      let parentElement = document.querySelector(".sub-comp.project");
      function appendText(newText,currentText)
      {
            return newText = newText + "\n" + currentText;
      }
      projectDetails.forEach(element => {
            //Left COlumn
            let child1 = document.createElement("h2");
            parentElement.appendChild(child1);
            let subchild1 = document.createTextNode(element.duration);
            child1.appendChild(subchild1);
            //Right Column
            let child2 = document.createElement("div");
            child2.classList.add("sub-comp_text");
            parentElement.appendChild(child2);
            let subchild2 = document.createElement("h2");
            subchild2.appendChild(document.createTextNode(element.role));
            child2.appendChild(subchild2);
            let subchild2a = document.createElement("ul");
            child2.appendChild(subchild2a);
            if(element.responsibilities)
            {
                  element.responsibilities.forEach(current =>   {
                        let subchild2b = document.createElement("li");
                        let subchild3 = document.createTextNode(current);
                        console.log("Value of Res" +subchild3.nodeValue);
                        subchild2b.appendChild(subchild3);
                        subchild2a.appendChild(subchild2b);
                  });
            }
      
      });
}();


