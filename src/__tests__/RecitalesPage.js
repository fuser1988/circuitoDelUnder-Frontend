import React from 'react';

import RecitalesPage from '../pages/RecitalesPage';
import RecitalCard from '../components/card/RecitalCard';
import SearchComponent from "components/search/SearchComponent.js";
import { mount } from 'enzyme';
import { RecitalServiceMock } from '../RecitalServiceMock.js'
import GrillaRecitales from '../components/body/GrillaRecitales';
import { Input, Button } from 'reactstrap';
const mockRecitalService = RecitalServiceMock;


jest.mock('services/RecitalService.js', () => ({
    useRecitalService: () => ( mockRecitalService() )
}));

jest.mock('components/Navbars/RecitalesNavbar.js', () => { return 'div' });

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: jest.fn()
    })
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),

    withRouter(component) {
        return component;
    }
}));


beforeEach(() => {
});


it('Cuando el usuario ingresa al la pagina de busqueda de recitales aparecen todos los recitales en la grilla.', () => {
    
    const MockLocation = { pathname: "/RecitalesPage" };
    
    const wrapper = mount(<RecitalesPage location={MockLocation} />)

    expect(wrapper.find(GrillaRecitales).length).toBe(1);
    expect(wrapper.find(RecitalCard).length).toBe(3);
});


it('Cuando el usuario ingresa al la pagina de busqueda redireccionado por link con parametro de busqueda .', () => {
    
    const MockLocation = {pathname: "/RecitalesPage", search: "?genero=punk", hash: "", state: undefined};
    
    const wrapper = mount(<RecitalesPage location={MockLocation} />)
    expect(wrapper.find(GrillaRecitales).length).toBe(1);
    expect(wrapper.find(RecitalCard).length).toBe(2);

});



it('Cuando el usuario ingresa un genero y presiona el botón buscar aparecen bandas del genero buscado.', () => {

    const wrapper = mount(<RecitalesPage location={{ pathname: "/RecitalesPage" }} />)

    const buscador = wrapper.find(SearchComponent)

    expect(buscador.find(Button).length).toBe(1);
    expect(buscador.find(Input).length).toBe(1);

    expect(wrapper.find(GrillaRecitales).length).toBe(1);
    expect(wrapper.find(RecitalCard).length).toBe(3);


    const input = buscador.find(Input);
    input.simulate('change', {
        'target': {
            value: 'Punk'
        }
    })
    const boton = buscador.find(Button);
    boton.simulate('click');

    expect(wrapper.find(GrillaRecitales).length).toBe(1);
    expect(wrapper.find(RecitalCard).length).toBe(2);
});
