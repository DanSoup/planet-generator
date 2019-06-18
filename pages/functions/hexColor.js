const hexColor = ({r, g, b, a}) => {
  const rS = Math.floor(r * 255).toString(16).padStart(2, '0');
  const gS = Math.floor(g * 255).toString(16).padStart(2, '0');
  const bS = Math.floor(b * 255).toString(16).padStart(2, '0');
  const aS = Math.floor(a * 255).toString(16).padStart(2, '0');
  return `#${rS}${gS}${bS}${aS}`;
}

export default hexColor;