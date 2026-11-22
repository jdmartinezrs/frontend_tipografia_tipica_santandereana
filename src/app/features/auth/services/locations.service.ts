import { Injectable } from '@angular/core';

export interface Department {
  name: string;
  cities: string[];
}
export interface Country {
  code: string;
  name: string;
  dialCode: string;
  departments: Department[];
}

const COUNTRIES: Country[] = [
  {
    code: 'CO',
    name: 'Colombia',
    dialCode: '+57',
    departments: [
      { name: 'Santander', cities: ['Bucaramanga', 'Floridablanca', 'Girón', 'Piedecuesta', 'San Gil', 'Barichara', 'Socorro', 'Barrancabermeja'] },
      { name: 'Norte de Santander', cities: ['Cúcuta', 'Ocaña', 'Pamplona'] },
      { name: 'Antioquia', cities: ['Medellín', 'Envigado', 'Rionegro'] },
      { name: 'Boyacá', cities: ['Tunja', 'Duitama', 'Villa de Leyva'] },
      { name: 'Cundinamarca', cities: ['Soacha', 'Zipaquirá', 'Girardot'] },
      { name: 'Bogotá D.C.', cities: ['Bogotá'] },
      { name: 'Valle del Cauca', cities: ['Cali', 'Palmira', 'Buenaventura'] },
    ],
  },
  {
    code: 'EC',
    name: 'Ecuador',
    dialCode: '+593',
    departments: [
      { name: 'Pichincha', cities: ['Quito'] },
      { name: 'Guayas', cities: ['Guayaquil'] },
    ],
  },
  {
    code: 'PE',
    name: 'Perú',
    dialCode: '+51',
    departments: [
      { name: 'Lima', cities: ['Lima'] },
      { name: 'Cusco', cities: ['Cusco'] },
    ],
  },
];

@Injectable({ providedIn: 'root' })
export class LocationsService {
  readonly countries = COUNTRIES;

  departmentsOf(countryCode: string) {
    return this.countries.find((c) => c.code === countryCode)?.departments ?? [];
  }

  citiesOf(countryCode: string, department: string) {
    return this.departmentsOf(countryCode).find((d) => d.name === department)?.cities ?? [];
  }

  dialCodeOf(countryCode: string) {
    return this.countries.find((c) => c.code === countryCode)?.dialCode ?? '';
  }
}