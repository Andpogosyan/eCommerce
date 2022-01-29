import Modal from '../src/components/Modal';
import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { expect } from 'chai';
import { CatchClause } from 'typescript';

_chai.should();
_chai.expect;

@suite class ModalComponentTest {
    private SUT: Modal;
    type: string = ''
    categories: Array<{name: string, id: number}> = []
    items: Array<{title: string, description: string, price: string, url: string, category: string, id: number, name: string, count: number}> = []

    before(){
        this.type = 'addItem'
        this.categories = [{name: 'test category', id: 1}]
        this.items = [{title: 'test', description: 'test', price: '0', url: 'test', category: 'test', id: 1, name: 'test', count: 1}]
        this.SUT = new Modal(this.type, this.categories, this.items)
    }
    @test 'Modal is created' () { 
        this.SUT.type.should.to.not.be.undefined.and.have.property('type').equal(this.type)
        this.SUT.categories.should.to.not.be.undefined.and.have.property('categories').equal(this.categories)
        this.SUT.items.should.to.not.be.undefined.and.have.property('items').equal(this.items)
    }
}