import AdminPage from '../src/pages/AdminPage';
import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { expect } from 'chai';
import { CatchClause } from 'typescript';

_chai.should();
_chai.expect;

@suite class AdminPageTest {
    private SUT: AdminPage;
    private visibleItems: string;
    private categories: any;

    before(){
        this.SUT = new AdminPage('')
        this.visibleItems = 'all'
        this.categories = []
    }
    @test 'AdminPage is created' () { 
        this.SUT.visibleItems.should.to.not.be.undefined.and.have.property('visibleItems').equal(this.visibleItems)
        this.SUT.categories.should.to.not.be.undefined.and.have.property('categories').equal(this.categories)
    }
}