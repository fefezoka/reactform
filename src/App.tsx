import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Country, SubmitedCountry } from './types/country.types';
import { City, SubmitedCity } from './types/city.types';
import { testCPF } from './utils/testCpf';
import Spinner from './assets/Spinner.svg';
import globalCSS from './style/globalCSS';
import {
  Step1,
  Step2,
  Step3,
  Button,
  Main,
  Progress,
  ProgressContainer,
  Container,
} from './components';

interface SubmitData {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  countries: SubmitedCountry[];
  cities: SubmitedCity[];
}

export default function App(): JSX.Element {
  const [page, setPage] = useState<number>(0);
  const [countries, setCountries] = useState<Country[]>();
  const [cities, setCities] = useState<City[]>();
  globalCSS();

  useEffect(() => {
    const getData = async () => {
      const { data: countries } = await axios.get(
        'https://amazon-api.sellead.com/country'
      );
      const { data: cities } = await axios.get('https://amazon-api.sellead.com/city');

      const filteredCountries: Country[] = [];

      countries.forEach((country: Country) => {
        cities.forEach((city: City) => {
          if (
            country.code.includes(city.country_code) &&
            !filteredCountries.includes(country)
          ) {
            return filteredCountries.push(country);
          }
        });
      });

      setCountries(filteredCountries);
      setCities(cities);
    };
    getData();
  }, []);

  // Schema de validação do formulário
  const formSchema = [
    yup.object({
      name: yup.string().required('O nome é obrigatório'),
      cpf: yup
        .string()
        .required('O CPF é obrigatório')
        .test('cpf', 'CPF inválido!', (cpf) => testCPF(cpf as string)),
      // O cpf precisa passar pelo cálculo para validação
      email: yup
        .string()
        .required('O email é obrigatório')
        .email('Insira um email válido!'),
      phone: yup
        .string()
        .required('O telefone é obrigatório')
        .matches(new RegExp('[0-9]{11}'), 'Número inválido')
        .max(11, 'Número inválido'),
    }),
    yup.object({
      countries: yup
        .array()
        .of(
          yup.object().shape({
            code: yup.string(),
            name: yup.string(),
          })
        )
        .required('Selecione no mínimo um país')
        .min(1, 'Selecione no mínimo um país'),
      cities: yup
        .array()
        .of(
          yup.object().shape({
            country_code: yup.string(),
            code: yup.number(),
            name: yup.string(),
          })
        )
        .required('Selecione no mínimo uma cidade')
        .min(1, 'Selecione no mínimo uma cidade'),
    }),
  ];

  const methods = useForm<SubmitData>({
    mode: 'all',
    resolver: yupResolver(formSchema[page]),
  });

  if (!cities || !countries) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100%',
        }}
      >
        <img src={Spinner} width={80} alt="Spinner" />
      </div>
    );
  }

  const onSubmit = methods.handleSubmit(async (data) => {
    setPage((p) => p + 1);
    // Retirei os possíveis caracteres especiais no CPF e espaçamentos indesejados em todos os campos.
    const cpf = data.cpf.replace(/[^\w\s]/gi, '').trim();
    const name = (() => data.name.trim().replace(/\b(\w)/g, (s) => s.toUpperCase()))();
    const email = data.email.toLowerCase().trim();
    const phone = data.phone.replace(/[^\w\s]/gi, '').trim();

    // Alterei o nome das propriedades, pois o React Select devolve os dados com nomes errados
    const countries = data.countries.map((country) => ({
      code: country.value,
      name: country.label,
    }));

    const cities = data.cities.map((city) => ({
      country_code: city.country_code,
      code: city.value,
      name: city.label,
    }));

    const formatedData = {
      cpf: cpf,
      name: name,
      email: email,
      phone: phone,
      countries: countries,
      cities: cities,
    };

    console.log(formatedData);
  });

  const nextPage = async () => {
    // Permite a troca da página apenas se todos os campos estiverem válidos
    const isValid = await methods.trigger();
    isValid && setPage((p) => p + 1);
  };

  return (
    <Main>
      {/* Barra de progresso das etapas do formulário */}
      <ProgressContainer>
        <div
          style={{
            display: 'flex',
            marginTop: '16px',
            justifyContent: 'space-between',
            fontSize: '14px',
          }}
        >
          <p>Dados pessoais</p>
          <p>Destinos de interesse</p>
          <p>Concluido</p>
        </div>
        <Progress>
          <div
            style={{
              width: page === 0 ? '33%' : page === 1 ? '66%' : '100%',
              borderRadius: '8px',
            }}
          />
        </Progress>
      </ProgressContainer>
      <Container>
        {page === 0 || page === 1 ? (
          <form onSubmit={onSubmit}>
            <FormProvider {...methods}>
              {page === 0 && <Step1 />}
              {page === 1 && <Step2 countries={countries} cities={cities} />}
            </FormProvider>

            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              {page === 1 && (
                <Button
                  type="button"
                  value="Voltar"
                  back
                  onClick={() => setPage((p) => p - 1)}
                ></Button>
              )}
              {page === 0 && (
                <Button type="button" value="Continuar" onClick={nextPage} />
              )}
              {page === 1 && <Button value="Enviar" type="submit" />}
            </div>
          </form>
        ) : (
          <Step3 name={methods.getValues('name')} />
          // envia ao component o nome do usuário
        )}
      </Container>
    </Main>
  );
}
