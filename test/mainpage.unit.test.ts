import MainPage from '../src/pages/MainPage';
import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { expect } from 'chai';
import { CatchClause } from 'typescript';

_chai.should();
_chai.expect;

@suite class MainPageTest {
    private SUT: MainPage;
    private visibleItems: string;
    private categories;

    before(){
        this.SUT = new MainPage('')
        this.visibleItems = 'all'
        this.categories = []
    }
    @test 'MainPage is created' () { 
        this.SUT.visibleItems.should.to.not.be.undefined.and.have.property('visibleItems').equal(this.visibleItems)
        this.SUT.categories.should.to.not.be.undefined.and.have.property('categories').equal(this.categories)
    }
}