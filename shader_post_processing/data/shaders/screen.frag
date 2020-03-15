#version 330

in vec2 v_uv;

uniform sampler2D u_screen_texture;
uniform int u_screen_size_x;
uniform int u_screen_size_y;
uniform float effect_intensity;

out vec4 fragColor;

void main() {

	vec2 screen = vec2(u_screen_size_x,u_screen_size_y);

	float ChromaticAberration = effect_intensity / 10.0 + 8.0;

    vec2 texel = 1.0 / screen.xy;
    
    vec2 coords = (v_uv - 0.5) * 2.0;
    float coordDot = dot (coords, coords);
    
    vec2 precompute = ChromaticAberration * coordDot * coords;
    vec2 uvR = v_uv - texel.xy * precompute;
    vec2 uvB = v_uv + texel.xy * precompute;
    
    vec3 color;
    color.r = texture(u_screen_texture, uvR).r;
    color.g = texture(u_screen_texture, v_uv).g;
    color.b = texture(u_screen_texture, uvB).b;

    fragColor = vec4(color,1.0);


	/*
	float power_effect = u_screen_size_x;
	float amount = 0.0;
	
	amount = (1.0 + sin(power_effect*6.0)) * 0.5;
	amount *= 1.0 + sin(power_effect*16.0) * 0.5;
	amount *= 1.0 + sin(power_effect*19.0) * 0.5;
	amount *= 1.0 + sin(power_effect*27.0) * 0.5;
	amount = pow(amount, 3.0);

	amount *= 0.05;
	
    vec3 col;
    col.r = texture( u_screen_texture, vec2(v_uv.x+amount,v_uv.y) ).r;
    col.g = texture( u_screen_texture, v_uv ).g;
    col.b = texture( u_screen_texture, vec2(v_uv.x-amount,v_uv.y) ).b;

	col *= (1.0 - amount * 0.5);
	
    fragColor = vec4(col,1.0);
	*/
}