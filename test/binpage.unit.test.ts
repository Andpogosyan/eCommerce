import BinPage from '../src/pages/Bin';
import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { expect } from 'chai';
import { CatchClause } from 'typescript';

_chai.should();
_chai.expect;

@suite class BinPageTest {
    private SUT: BinPage;
    private visibleItems: string;

    before(){
        this.SUT = new BinPage('bin')
        this.visibleItems = 'all'
    }
    @test 'BinPage is created' () { 
        this.SUT.visibleItems.should.to.not.be.undefined.and.have.property('visibleItems').equal(this.visibleItems)
    }
}