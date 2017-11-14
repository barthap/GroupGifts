import math

class Person:  
    def __init__(self, name, how_much_paid = 0):
        self.name = name
        self.how_much_paid = how_much_paid
        
    def Show(self):
        if how_much_paid > 0:
            return self.name + ",       " + self.how_much_paid + " zl"
        else:
            return self.name
            
class DebtPerson:
    def __init__(self, person, how_much):
        self.person = person
        self.how_much = how_much
        
    def Zero(self):
        self.how_much = 0
        
    def Substract(self, n):
        self.how_much -= n
        
        
def Calculate(ppl, delegates=None):
    
    PersonCount = len(ppl)
    Sum = 0
    ResultText = ""
    
    for p in ppl:
        Sum += p.how_much_paid
        
    SumPerOs = Sum / PersonCount
    
    debtors = []
    creditors = []
    
    for p in ppl:     
        diff = p.how_much_paid - SumPerOs
        
        if diff > 0:
            creditors.append(DebtPerson(p, diff))
            
            ResultText += p.name + " +++ = " + str(round(diff,2)) + " zl \r\n"
            
        elif diff < 0:
            debtors.append(DebtPerson(p, math.fabs(diff)))
            
            ResultText += p.name + " --- = " + str(math.fabs(round(diff,2))) + " zl \r\n"
                    
    ResultText += "\r\n"        
            
    for c in creditors:
        if c.how_much <= 0:
            continue
            
        for d in debtors:
            if d.how_much <= 0:
                continue
            
            if d.how_much >= c.how_much:             
                ResultText += d.person.name + " -> " + c.person.name + " = " + str(round(c.how_much,2)) + " zl\r\n"
                d.Substract(c.how_much)
                c.Zero()
                
                break
            else:
                ResultText += d.person.name + " -> " + c.person.name + " = " + str(round(d.how_much,2)) + " zl\r\n"
                c.Substract(d.how_much)
                d.Zero()

    SumPerOs = round(SumPerOs,2)
    
    return PersonCount, Sum, SumPerOs, ResultText        
            
def LoadExampleData():
    arr = [
		Person("Bartek", 120),
        Person("Jadzia", 62),
        Person("Magda", 36),
        Person("Anka"),
        Person("Karolina"),
        Person("Kasia"),
        Person("Kondzio"),
        Person("Mati"),
        Person("Michal"),
    ]
    return arr

#testing    
ludzie = LoadExampleData()
num, sum, ratio, res = Calculate(ludzie)
print(res)
            
            
            
            
        
        