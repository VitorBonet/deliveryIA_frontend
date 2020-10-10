import React from 'react';

import { Link } from 'react-router-dom';

import { Container, LogoText } from './styles';

import Logo from '../../assets/delivery_logo_small.png';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'small' }: HeaderProps) => (
  <Container size={size}>
    <header>
      <LogoText>Money Delivery</LogoText>
      <nav>
        <Link to="/">Importar</Link>
        <Link to="/Dashboard">Listagem</Link>
      </nav>
    </header>
  </Container>
);

export default Header;
