import React from 'react';
import '../styles/charter-reference.css';

const CharterReferencePage: React.FC = () => {
  return (
    <main className="charter-ref-page">
      <section className="charter-hero">
        <video className="charter-hero__video" autoPlay muted loop playsInline>
          <source src="/assets/reference/charter/Superyachts Luxury Mega Yachts for Sale Charter Burgess.mp4" type="video/mp4" />
        </video>
        <div className="charter-hero__overlay">
          <h1 className="charter-hero__title">Charter</h1>
          <p className="charter-hero__subtitle">The Ultimate Standard in Luxury Yachting</p>
        </div>
      </section>

      <section className="charter-intro">
        <div className="container">
          <h2>Discover our charter fleet</h2>
          <p>Explore handpicked yachts available for charter worldwide. Prices shown include our 10% service markup. Deposit 10% payable in crypto.</p>
        </div>
      </section>

      <section className="charter-grid">
        <article className="card">
          <img src="/assets/reference/charter/imgi_13_joy_00007704_vb1014912_3840x2560.jpg" alt="JOY - Yacht" />
          <div className="card-body">
            <h3>JOY</h3>
            <p>Superyacht available for charter</p>
          </div>
        </article>
        <article className="card">
          <img src="/assets/reference/charter/imgi_26_alvia_10000956_vb5273762.jpg" alt="ALVIA - Yacht" />
          <div className="card-body">
            <h3>ALVIA</h3>
            <p>Available for charter</p>
          </div>
        </article>
        <article className="card">
          <img src="/assets/reference/charter/imgi_17_synthesis_10000180_vb5700849_3200x2134.jpg" alt="SYNTHESIS - Yacht" />
          <div className="card-body">
            <h3>SYNTHESIS</h3>
            <p>Featured yacht</p>
          </div>
        </article>
      </section>

      <section className="charter-cta">
        <div className="container">
          <a className="btn" href="/enquire">Enquire now</a>
        </div>
      </section>
    </main>
  );
};

export default CharterReferencePage;
