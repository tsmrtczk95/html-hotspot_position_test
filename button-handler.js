// Custom component for button interaction
AFRAME.registerComponent('button-handler', {
  schema: {
    text: {type: 'string', default: 'Button'},
    color: {type: 'string', default: '#3498db'}
  },
  
  init: function() {
    const el = this.el;
    const data = this.data;
    
    // Create button elements
    const button = document.createElement('a-entity');
    button.setAttribute('geometry', 'primitive: plane; width: 0.3; height: 0.3');
    button.setAttribute('material', `color: ${data.color}; shader: flat`);
    button.setAttribute('position', '0 0 0.01');
    
    const text = document.createElement('a-text');
    text.setAttribute('value', data.text);
    text.setAttribute('position', '0 0 0.02');
    text.setAttribute('align', 'center');
    text.setAttribute('color', '#ffffff');
    text.setAttribute('width', '0.5');
    
    el.appendChild(button);
    el.appendChild(text);
    
    // Interaction handlers
    el.addEventListener('click', () => {
      el.setAttribute('scale', '0.95 0.95 0.95');
      setTimeout(() => el.setAttribute('scale', '1 1 1'), 200);
      console.log(`Button clicked: ${data.text}`);
      // Add your custom action here
    });
    
    el.addEventListener('mouseenter', () => {
      el.setAttribute('material', `color: ${this.darkenColor(data.color, 20)}`);
    });
    
    el.addEventListener('mouseleave', () => {
      el.setAttribute('material', `color: ${data.color}`);
    });
  },
  
  darkenColor: function(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return '#' + (
      0x1000000 + 
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + 
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + 
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    ).toString(16).slice(1);
  }
});
