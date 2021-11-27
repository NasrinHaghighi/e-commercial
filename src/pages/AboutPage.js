import React from 'react'
import styled from 'styled-components'
import { Hero, PageHero } from '../components'
import aboutImg from '../assets/hero-bcg.jpeg'

const AboutPage = () => {
  return( <main>
  <PageHero title='about'/>
  <Wrapper className='page section section-center'>
    <img src={aboutImg} alt="" />
    <article>
    <div className='title'>
      <h3>Our Sroty</h3>
      <div className='underline'></div>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla soluta earum error! Minus consequatur et ipsum explicabo doloremque possimus ad quia ut illum quisquam ab ex dignissimos natus, totam nobis.

      </p>

    </div>
    </article>
  </Wrapper>
  </main>)
}

const Wrapper = styled.section`


  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 16px;
  grid-row-gap: 0px;
  
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
