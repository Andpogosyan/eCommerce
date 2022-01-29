import App from '../src/pages/App';
import Header from '../src/components/Header'
import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { expect } from 'chai';
import { CatchClause } from 'typescript';

_chai.should();
_chai.expect;

@suite class AppComponentTest {
    private SUT: App;
    private header: Header

    before(){
        this.SUT = new App()
        this.header = new Header('header', 'header')
    }
    @test 'App is created' () { 
        
        // this.SUT.defaultPageId.should.to.not.be.undefined.and.have.property('defaultPageId').equal('current-page')
        this.SUT.header.should.to.not.be.undefined.and.have.property('header').equal(this.header)
    }
}