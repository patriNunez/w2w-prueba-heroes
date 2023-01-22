import { HeroesService } from './heroes.service';
import { TestBed } from '@angular/core/testing';
import { UtilitiesService } from './utilities.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { IHero } from 'src/app/shared/models/interfaces';

const expectedUrl = 'http://localhost:3000/heroes';
describe('HeroesService', () => {
  let heroesService: HeroesService;
  let testingController: HttpTestingController;

  /**
   * Using sample data to check implementation of CRUD methods
   */
  const mockData: IHero[] = [
    {
      id: 1,
      name: 'SuperMan',
      age: 23,
      power: 'laser beams',
    },
    {
      id: 2,
      name: 'BatMan',
      age: 35,
      power: 'fly',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroesService, UtilitiesService],
    });
    heroesService = TestBed.inject(HeroesService);
    testingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    testingController.verify();
  });

  it('getHeroes should make a GET HTTP request and return all data items', () => {
    heroesService.getHeroes().subscribe((res) => {
      expect(res).toEqual(mockData);
      expect(res.length).toBe(2);
    });
    const req = testingController.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(mockData);
    testingController.verify();
  });
  it('getHeroe should make a GET HTTP request with id appended to end of url', () => {
    heroesService.getHero(1).subscribe((res) => {
      expect(res).toEqual(mockData[0]);
    });
    const req = testingController.expectOne(expectedUrl + '/1');
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush({ id: 1, name: 'SuperMan', age: 23, power: 'laser beams' });
  });
  it('insertHeroe should make a POST HTTP request with new IHero as body', () => {
    const createObj = {
      id: 3,
      name: 'New Hero',
      age: 35,
      power: 'fire',
    };
    heroesService.insertHero(createObj).subscribe((res) => {
      expect(res).toBe(createObj);
    });
    const req = testingController.expectOne(expectedUrl, 'post to api');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(createObj);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(createObj);
  });
  it('update should make a PUT HTTP request with id appended to end of url and resource as body', () => {
    const updateObj = {
      id: 1,
      name: 'SuperMan updated',
      age: 23,
      power: 'laser beams',
    };
    heroesService.updateHero(updateObj).subscribe((res) => {
      expect(res).toBeTruthy();
    });
    const req = testingController.expectOne(expectedUrl + '/1', 'put to api');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBe(updateObj);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush({ status: true });
  });
  it('deleteHero should make a DELETE HTTP request with id appended to end of url', () => {
    heroesService.deleteHero(1).subscribe((res) => {
      expect(res).toBe(true);
    });
    const req = testingController.expectOne(
      expectedUrl + '/1',
      'delete to api'
    );
    expect(req.request.method).toBe('DELETE');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush({ status: true });
  });
});
