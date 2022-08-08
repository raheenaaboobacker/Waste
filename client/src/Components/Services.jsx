import React from 'react'

function Services() {
  return (
    <div><div className="wrapper row3" id='services'>
      <main className="hoc container clear">
        <div className="sectiontitle" style={{ textAlign: "center" }}>
          <h6 className="heading">What we Offer</h6>
          <p>OUR SERVICES.</p>
        </div>
        <ul className="nospace group services" >
          <li className="one_third first" style={{ maxHeight: "100px" }}>
            <article className="infobox">
              <img src="https://template65291.motopreview.com/mt-demo/65200/65291/mt-content/uploads/2017/11/mt-1238-home-img02.jpg" />
              <h6 className="heading">Waste Pickup</h6>
              <p>Scheduled Waste <br />Pickup Dumpster<br /> Rental Hazardous<br /> Waste Disposal</p>
            </article>
          </li>
          <li className="one_third">
            <article className="infobox">
              <img src="https://template65291.motopreview.com/mt-demo/65200/65291/mt-content/uploads/2017/11/mt-1238-home-img01.jpg" />
              <h6 className="heading">Recycling Services</h6>
              <p>Food and Organic<br /> Waste Pickup<br /> Recycling Pickup <br />Battery Recycling</p>
            </article>
          </li>
          <li className="one_third">
            <article className="infobox">
              <img src="https://template65291.motopreview.com/mt-demo/65200/65291/mt-content/uploads/2017/11/mt-1238-home-img03.jpg" />
              <h6 className="heading"> Waste Services</h6>
              <p>Landfill & Facilities<br /> Bulk Waste Pickup <br />Document and<br /> Product Destruction</p>
            </article>
          </li>
        </ul>

        <div className="clear"></div>
      </main>
    </div></div>
  )
}

export default Services