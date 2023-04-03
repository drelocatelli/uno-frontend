/// <reference types="cypress" />
import 'dotenv/config';
import { apiURl } from './setup';

describe('Login test', () => {
  it.only('login as guest', () => {
    cy.viewport('macbook-11')
    cy.visit(apiURl)
    cy.get('.container', {timeout: 10000}).children().get('.content__guest')
    cy.on('window:confirm', (str) => {
      expect(str).to.eq(true)
    })
  })

  // it.only('login as user', () => {
  //   cy.viewport('macbook-11')
  //   cy.visit(apiURl)
  //   cy.get('.container', {timeout: 10000}).children().get('.content__guest')
  // })
})