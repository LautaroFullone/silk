import MissionSection from './components/MissionSection'
import ValuesSection from './components/ValuesSection'
import TeamSection from './components/TeamSection'
import WorkSection from './components/WorkSection'

const About = () => {
   return (
      <>
         <TeamSection />
         <MissionSection />
         <ValuesSection />

         <div className="flex justify-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-silk-secondary/30 to-transparent"></div>
         </div>

         <WorkSection />
      </>
   )
}

export default About
