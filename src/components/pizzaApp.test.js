import React from 'react';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PizzaApp from './pizzaApp';

configure({adapter: new Adapter()});

describe('<PizzaApp /> Component', () => {
    let component, testProps;
    it('should have div tag', ()=>{
        component = shallow(<PizzaApp />);
        console.log(component);
            expect(component).toHaveLength(1);
    });

    describe('Searching pizza items', function () {
        let searchElement, component;
        component = shallow(<PizzaApp />)
        beforeEach(function () {
            searchElement = component.props().children[0];
        });
    
        it('should have a input textbox', function () {
            expect(searchElement.type).toBe('input');
        })

        // it('should filter Pizza List', function () {
        //     const filteredItem = ['Sausage'];
        //     searchElement.props.onKeyUp({target: {value: 'sa'}});
        //     expect(component.state('pizzas')).toEqual(filteredItem);
        // });

        it('onChange attribute should be of type `function`', () => {
            expect(
              typeof component.find('div').childAt(0).props().onChange === 'function'
            ).toBe(true);
          });

        //   it('should update the state when a value is input', () => {
        //     const name = 'Sausage';
        //     const input = component.find('div').childAt(0);
        //     input.simulate('change', {
        //       target: {
        //         name: 'name',
        //         value: name,
        //       }
        //     });
        //     expect(
        //       component.state().pizzas[0]
        //     ).toEqual(name);
        //   });
        //   it('should filter Pizza List', function () {
        //         const filteredItem = ['Sausage'];
        //         // component.props().children[0].props.simulate("change", {target: {value: 'sa'}});
        //         component.find('div').childAt(0).simulate('change', {target: {value: 'sa'}})
        //         expect(component.state('pizzas')).toEqual(filteredItem);
        //     });
    });
    
    it('should render ReactTable tag', ()=>{
         component = shallow(<PizzaApp />);
        expect(component.find('ReactTable')).toHaveLength(1);
    });
});

