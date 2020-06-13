import React from 'react';

import GrillaRecitales from '../components/body/GrillaRecitales';
import { shallow } from 'enzyme';
import RecitalCard from '../components/card/RecitalCard';
import {recitalesMock} from '../RecitalesMock'

it('cuando recibe recitales por props renderiza las cards de recitales',()=>{
    const wrapper = shallow(<GrillaRecitales recitales ={recitalesMock} />)
    expect(wrapper.find(RecitalCard).length).toBe(3);
});

it('cuando recibe una lista de vacia de recitales no renderiza cards de recitales',()=>{
    const wrapper = shallow(<GrillaRecitales recitales ={[]} />)
    expect(wrapper.find(RecitalCard).length).toBe(0);
});



