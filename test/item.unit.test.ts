import ItemBlock from '../src/components/Item';
import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { expect } from 'chai';
import { CatchClause } from 'typescript';

_chai.should();
_chai.expect;

@suite class ItemComponentTest {
    private SUT: ItemBlock;
    page: string
    item: {title: string, description: string, price: string, url: string, category: string, id: number, name: string, count: number}

    before(){
        this.page = 'testPage'
        this.item = {title: 'test', description: 'test', price: '0', url: 'test', category: 'test', id: 1, name: 'test', count: 1}
        this.SUT = new ItemBlock('div', 'testClassName', this.item, this.page)
    }
    @test 'Item is created' () { 
        this.SUT.page.should.to.not.be.undefined.and.have.property('page').equal(this.page)
        this.SUT.item.should.to.not.be.undefined.and.have.property('item').equal(this.item)
    }
}