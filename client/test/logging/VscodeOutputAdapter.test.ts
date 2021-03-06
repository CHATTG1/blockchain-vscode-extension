/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

import { VSCodeOutputAdapter } from '../../src/logging/VSCodeOutputAdapter';

import * as chai from 'chai';
import * as sinon from 'sinon';

chai.should();

// tslint:disable no-unused-expression
describe('VSCodeOutputAdapter', () => {

    const outputAdapter: VSCodeOutputAdapter = VSCodeOutputAdapter.instance();
    let sandbox: sinon.SinonSandbox;

    beforeEach(async () => {
        sandbox = sinon.createSandbox();
        outputAdapter.setConsole(false);
    });

    afterEach(async () => {
        sandbox.restore();
        outputAdapter.setConsole(false);
    });

    describe('#log', () => {

        it('should log to the output channel', () => {
            const outputSpy: sinon.SinonSpy = sandbox.spy(outputAdapter['outputChannel'], 'appendLine');
            outputAdapter.log('hello world');
            outputSpy.should.have.been.calledOnceWithExactly('hello world');
        });
    });

    describe('#error', () => {
        it('should log to the output channel', () => {
            const outputSpy: sinon.SinonSpy = sandbox.spy(outputAdapter['outputChannel'], 'appendLine');
            outputAdapter.error('hello world');
            outputSpy.should.have.been.calledOnceWithExactly('hello world');
        });
    });

    describe('#show', () => {
        it('should show the output channel', () => {
            const outputSpy: sinon.SinonSpy = sandbox.spy(outputAdapter['outputChannel'], 'show');
            outputAdapter.show();
            outputSpy.should.have.been.calledOnce;
        });
    });

    describe('#setConsole', () => {
        it('should enable console logging', () => {
            outputAdapter.setConsole(true);
            const consoleLogSpy: sinon.SinonSpy = sandbox.spy(console, 'log');
            outputAdapter.log('hello world');
            consoleLogSpy.should.have.been.called.calledOnceWithExactly('hello world');
            const consoleErrorSpy: sinon.SinonSpy = sandbox.spy(console, 'error');
            outputAdapter.error('hello world');
            consoleErrorSpy.should.have.been.called.calledOnceWithExactly('hello world');
        });

        it('should disable console logging', () => {
            outputAdapter.setConsole(false);
            const consoleLogSpy: sinon.SinonSpy = sandbox.spy(console, 'log');
            outputAdapter.log('hello world');
            consoleLogSpy.should.have.not.been.called;
            const consoleErrorSpy: sinon.SinonSpy = sandbox.spy(console, 'error');
            outputAdapter.error('hello world');
            consoleErrorSpy.should.have.not.been.called;
        });
    });

});
